import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Documento } from "./entity/documento.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentoDto } from "./dto/documento.dto";
import { Beneficiario } from "src/beneficiarios/entity/beneficiario.entity";

@Injectable()
export class DocumentoService{

    constructor(
        @InjectRepository(Documento)
        private documentoRepository: Repository<Documento>,
        @InjectRepository(Beneficiario)
        private beneficiarioRepository: Repository<Beneficiario>

    ){

    }

    async novoDocumento(body: DocumentoDto): Promise<void>{
        const beneficiario = await this.beneficiarioRepository.findOne({
            where: {
                id: body.id_beneficiario
            },
            relations: ['documentos']
        })
        if(!beneficiario)
            throw new NotFoundException("Usuario nao cadastrado")

        beneficiario.documentos.forEach((documento)=>{
            if(documento.tipoDocumento == body.tipoDocumento)
                throw new BadRequestException("Ja existe um documento desse tipo cadastrado")
        })

        const dataAtual = new Date

        const novoDocumento = this.documentoRepository.create({
            tipoDocumento: body.tipoDocumento,
            descricao: body.descricao,
            dataInclusao: dataAtual,
            dataAtualizacao: dataAtual,
            beneficiario: beneficiario
        })

        await this.documentoRepository.save(novoDocumento)
    }

    async buscaDocumentos(id: number): Promise<Documento[]>{

        const beneficiario = await this.beneficiarioRepository.findOne({
            where: { id },
            relations: ['documentos'] // carrega a relação de documentos
        });

        if(!beneficiario)
            throw new NotFoundException("Usuario nao cadastrado")

        return beneficiario.documentos

    }
}