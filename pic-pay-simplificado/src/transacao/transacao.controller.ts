import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { TransacaoDto } from "./dto/transacao.dto";
import type { Response } from "express";
import { TransacaoService } from "./transacao.service";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
export class TransacaoController{

    constructor(private readonly transacaoService: TransacaoService){

    }

    @ApiTags('Transacao')
        @ApiOperation({summary: 'realiza transacao caso usuario esteja autenticado via bearer token'})
        @ApiBody({schema: {
            example: {
                "valor": 1000,
                "pagador": 6,
                "recebedor": 5,
                "tipo_transacao": "PIX"
            }
        }})
        @ApiResponse({status: 200, description: 'Transacao realizada com sucesso'})
        @ApiResponse({status: 401, description: 'Token nao fornecido'})
        @ApiResponse({status: 401, description: 'Transacao nao autorizada pelo sistema'})
        @ApiResponse({status: 404, description: 'Usuario nao encontrado'})
        @ApiResponse({status: 504, description: 'Erro ao enviar notificação'})
    @UseGuards(AuthGuard)
    @Post('/transacao')
        async postTransacao(@Body() transacao: TransacaoDto, @Res() res: Response): Promise<Response>{
            try{
                await this.transacaoService.realizaTransacao(transacao)
                return res.status(HttpStatus.OK).send("Transação realizada com sucesso")
            }catch(erro){
                return res.status(HttpStatus.BAD_REQUEST).send("Erro na transacao\n"+ erro)
            }
        }
}