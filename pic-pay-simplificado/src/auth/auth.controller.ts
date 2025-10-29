import { Body, Controller, HttpStatus, Post, Res, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import type{ Response } from "express";

@Controller()
export class AuthController{

    constructor(private readonly authService: AuthService){}

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