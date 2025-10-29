import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { TransacaoDto } from "../transacao/dto/transacao.dto";
import type { Response } from "express";
import { UsuariosDto } from "./dto/usuarios.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";

@Controller()
export class UsuariosController{

    constructor(
        private readonly usuariosService: UsuariosService
    ){

    }


        @ApiOperation({summary: 'cria um novo usuario'})
        @ApiBody({schema: {
            example: {
                "cpf": "22111212121",
	            "nome_completo": "Pedro",
	            "tipo_usuario": "padrao",
	            "email": "thithi2@gmail.com",
	            "senha": "senha",
	            "saldo": 1000
            }
        }})
        @ApiResponse({status: 200, description: 'Usuario criado com sucesso'})
        @ApiResponse({status: 404, description: 'Usuario ja cadastrado'})
    @Post('/cadastro')
    async criaUsuario(@Body() usuario: UsuariosDto, @Res() res: Response): Promise<Response>{
        try{
            await this.usuariosService.postUsuario(usuario)
            return res.status(HttpStatus.OK).send("Usuario criado com sucesso")
        }catch(erro){
            return res.status(HttpStatus.BAD_REQUEST).send("Erro ao criar usuario")
        }
    }

    @ApiOperation({summary: 'obtem um usuario'})
        @ApiParam({name: 'id', description: 'id do usuario a ser buscado'})
        @ApiResponse({status: 200, description: 'Retorna um usuario'})
        @ApiResponse({status: 404, description: 'Usuario não cadastrado'})
    @UseGuards(AuthGuard)
    @Get('/usuario/:id')
    async getUsuario(@Param('id') id: string, @Res()res: Response): Promise<Response>{
        try{
            const usuario = await this.usuariosService.getUsuario(Number(id))
            return res.status(HttpStatus.OK).json(usuario)
        }catch(erro){
            return res.status(HttpStatus.NOT_FOUND).send(erro)
        }
    }
}