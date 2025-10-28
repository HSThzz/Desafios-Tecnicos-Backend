import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { TransacaoDto } from "../transacao/dto/transacao.dto";
import type { Response } from "express";
import { UsuariosDto } from "./dto/usuarios.dto";

@Controller()
export class UsuariosController{

    constructor(
        private readonly usuariosService: UsuariosService
    ){

    }

    @Post('/cadastro')
    async postUsuario(@Body() usuario: UsuariosDto, @Res() res: Response): Promise<Response>{
        try{
            await this.usuariosService.postUsuario(usuario)
            return res.status(HttpStatus.OK).send("Usuario criado com sucesso")
        }catch(erro){
            return res.status(HttpStatus.BAD_REQUEST).send("Erro ao criar usuario")
        }
    }
}