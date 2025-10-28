import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { ClienteService } from "./cliente.service";
import { ClientDto } from "./dto/create-client.dto";

@Controller()
export class ClienteController{

    constructor(
        private readonly clientService: ClienteService
    ){

    }

    @Post("/clientes")
    async postClient(@Body() cliente: ClientDto, @Res() res: Response): Promise<Response>{
        try{
            await this.clientService.postClient(cliente)
            return res.status(HttpStatus.CREATED).send("Cliente criado com sucesso")
        }catch(erro){
            return res.status(HttpStatus.BAD_REQUEST).send("Falha ao criar usuario"+ erro)
        }

    }

    @Get("/clientes/:id")
    async getClient(@Param('id') id: string, @Res()res: Response): Promise<Response>{

        try{
            const cliente = await this.clientService.getClient(Number(id))
            return res.status(HttpStatus.OK).json(cliente)

        }catch{
            return res.status(HttpStatus.NOT_FOUND).send("Erro ao encontrar cliente")
        }


    }
}