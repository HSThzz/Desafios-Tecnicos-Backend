import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { BeneficiariosService } from "./beneficiarios.service";
import { BeneficiarioDto } from "./dto/beneficiario.dto";
import type { Response } from "express";
import { Beneficiario } from "./entity/beneficiario.entity";

@Controller()
export class BeneficiariosController{

    constructor(
        private readonly beneficiarioService: BeneficiariosService
    ){

    }


    @Post('post/beneficiario')
    async novoBeneficiario(@Body() body: BeneficiarioDto, @Res() res: Response): Promise<Response>{
        try{
            await this.beneficiarioService.novoBeneficiario(body)
            return res.status(HttpStatus.OK).send("Beneficiario cadastrado com sucesso")
        }catch(erro){
            return res.status(HttpStatus.BAD_REQUEST).send(erro.message)
        }
    }

    @Get('get/beneficiarios')
    async listaBeneficiarios(@Res() res: Response): Promise<Response>{
        try{
            const beneficiarios: Beneficiario[] = await this.beneficiarioService.listaBeneficiarios()
            return res.status(HttpStatus.OK).json(beneficiarios)
        }catch(erro){
            return res.status(HttpStatus.BAD_REQUEST).send(erro.message)
        }
    }

    @Delete('delete/:id/beneficiarios')
    async apagaBeneficiario(@Param('id')id: string, @Res() res: Response): Promise<Response>{
        try{
            await this.beneficiarioService.apagaBeneficiario(Number(id))
            return res.status(HttpStatus.OK).send("Beneficiario apagado com sucesso")
        }catch(erro){
            return res.status(HttpStatus.BAD_REQUEST).send(erro.message)
        }
    }
}