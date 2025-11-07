import { BadRequestException, Get, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Beneficiario } from "./entity/beneficiario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BeneficiarioDto } from "./dto/beneficiario.dto";
import { Documento } from "src/documento/entity/documento.entity";
import { IsEmpty } from "class-validator";

@Injectable()
export class BeneficiariosService{

    constructor(
        @InjectRepository(Beneficiario)
        private beneficiariosRepository: Repository<Beneficiario>
    ){

    }

    async novoBeneficiario(body: BeneficiarioDto): Promise<void>{

        const beneficiario = await this.beneficiariosRepository.findOne({
            where: {
                telefone: body.telefone
            }
        })
        if(beneficiario)
           throw new BadRequestException("Beneficiario ja cadastrado")

        const dataAtual = new Date()
        
        const novoBeneficiario = this.beneficiariosRepository.create({
            nome: body.nome,
            telefone: body.telefone,
            dataNascimento: body.dataNascimento,
            dataInclusao: dataAtual,
            dataAtualizacao: dataAtual,
            documentos: []
        })

        await this.beneficiariosRepository.save(novoBeneficiario)
    }

    
    async listaBeneficiarios(): Promise<Beneficiario[]>{

        const beneficiarios: Beneficiario[] = await this.beneficiariosRepository.find()

        if(!beneficiarios)
            throw new NotFoundException("Nao foram encontrados beneficiarios")

        return beneficiarios
    }


    async apagaBeneficiario(id: number): Promise<void>{

        const beneficiario = await this.beneficiariosRepository.findOne({
            where: {
                id: id
            },
            relations: ['documentos']
        })
    
        if(!beneficiario)
            throw new NotFoundException("Nao foi possivel encontrar o beneficiario")

        
        await this.beneficiariosRepository.remove(beneficiario)
    }

    async atualizaBeneficiario(id: number, body: BeneficiarioDto): Promise<void>{

        if(body.nome == null || body.telefone == null)
            throw new BadRequestException("Preencha os valores de nome e telefone")

        const beneficiario = await this.beneficiariosRepository.findOneBy({id})
        if(!beneficiario)
            throw new NotFoundException("Beneficiario nao encontrado")

        const dataAtual = new Date()

        beneficiario.nome = body.nome
        beneficiario.telefone = body.telefone
        beneficiario.dataAtualizacao = dataAtual 

        await this.beneficiariosRepository.save(beneficiario)

    }

}