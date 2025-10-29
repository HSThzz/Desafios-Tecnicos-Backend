import { Body, Controller, HttpStatus, Post, Res, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import type{ Response } from "express";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
export class AuthController{

    constructor(private readonly authService: AuthService){}

    
    @ApiOperation({summary: 'fornece o token de autenticação para login'})
    @ApiBody({schema: {
        example: {
	        "email": "teste2@gmail.com",
	        "senha": "senha123"
        }
    }})
    @ApiResponse({status: 200, description: 'Login realizado com sucesso'})
    @ApiResponse({status: 401, description: 'Senha incorreta'})
    @ApiResponse({status: 404, description: 'Usuario nao encontrado'})
    @Post("/login")
    async postLogin(@Body() loginDto: LoginDto, @Res()res: Response): Promise<Response>{
        try{
            const token = await this.authService.realizaLogin(loginDto)
            return res.status(HttpStatus.OK).json(token)
        }catch(erro){
            throw new UnauthorizedException(erro)
        }
    }
}