import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { BeneficiariosService } from "./beneficiarios.service";
import { BeneficiarioDto } from "./dto/beneficiario.dto";
import type { Response } from "express";

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
}