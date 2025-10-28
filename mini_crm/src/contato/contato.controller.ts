import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import type{ Response } from "express";
import { Contato } from "./entity/contato.entity";
import { ContatoService } from "./contato.service";
import { ContatoDto } from "./dto/create-contato.dto";

@Controller('/clientes')
export class ContatoController{

    constructor(
        private readonly contatoService: ContatoService
    ){

    }


    @Get("/:id/contatos")
    async getContato(@Param('id') id: string, @Res() res: Response): Promise<Response>{
        try{
            const contato = await this.contatoService.getContato(Number(id))
            return res.status(HttpStatus.OK).json(contato)
        }catch(erro){
            return res.status(HttpStatus.NOT_FOUND).send("Erro ao encontrar contato" + erro)
        }
    }

    @Post('/:id/contatos')
    async postContato(@Param('id') id: string, @Body() contato: ContatoDto, @Res()res: Response): Promise<Response>{
        try{
            await this.contatoService.postContato(Number(id), contato)
            return res.status(HttpStatus.CREATED).send("Contato criado com sucesso")
        }catch(erro){
            return res.status(HttpStatus.NOT_FOUND).send("Erro ao cadastrar contato"+ erro)
        }
    }

}