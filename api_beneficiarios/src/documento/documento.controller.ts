import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { DocumentoService } from "./documento.service";
import { DocumentoDto } from "./dto/documento.dto";
import type { Response } from "express";
import { Http2ServerRequest } from "http2";

@Controller()
export class DocumentoController{

    constructor(
        private readonly documentoService: DocumentoService
    ){

    }

    @Post('/post/documentos')
    async novoDocumento(@Body() body: DocumentoDto, @Res() res: Response): Promise<Response>{
        try{
            await this.documentoService.novoDocumento(body)
            return res.status(HttpStatus.OK).send("Documento criado com sucesso")
        }catch(erro){
            return res.status(HttpStatus.BAD_REQUEST).send(erro.message)
        }
    }

    @Get('/get/documentos')
    async buscaDocumentos(@Param('id') id: string, @Res() res: Response): Promise<Response>{
        try{
            const documentos = await this.documentoService.buscaDocumentos(Number(id))
            return res.status(HttpStatus.OK).json(documentos)
        }catch(erro){
            return res.status(HttpStatus.BAD_REQUEST).send(erro.message)
        }
    }
}