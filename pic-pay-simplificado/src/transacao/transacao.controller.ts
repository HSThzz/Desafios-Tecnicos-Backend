import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { TransacaoDto } from "./dto/transacao.dto";
import type { Response } from "express";
import { TransacaoService } from "./transacao.service";

@Controller()
export class TransacaoController{

    constructor(private readonly transacaoService: TransacaoService){

    }

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