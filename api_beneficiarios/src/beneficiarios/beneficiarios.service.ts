import { BadRequestException, Get, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Beneficiario } from "./entity/beneficiario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BeneficiarioDto } from "./dto/beneficiario.dto";

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

}