import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { TransacaoDto } from "./dto/transacao.dto";
import type { Response } from "express";
import { TransacaoService } from "./transacao.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller()
export class TransacaoController{

    constructor(private readonly transacaoService: TransacaoService){

    }

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