import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Documento } from "./entity/documento.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentoDto } from "./dto/documento.dto";

@Injectable()
export class DocumentoService{

    constructor(
        @InjectRepository(Documento)
        private documentoRepository: Repository<Documento>
    ){

    }

    async novoDocumento(body: DocumentoDto): Promise<void>{
        const documento = await this.documentoRepository.findOne({
            where: {
               tipoDocumento: body.tipoDocumento 
            }
        })
        if(documento)
            throw new BadRequestException("Erro, documento ja cadastrado")

        const dataAtual = new Date

        const novoDocumento = this.documentoRepository.create({
            tipoDocumento: body.tipoDocumento,
            descricao: body.descricao,
            dataInclusao: dataAtual,
            dataAtualizacao: dataAtual
        })

        await this.documentoRepository.save(novoDocumento)
    }
}