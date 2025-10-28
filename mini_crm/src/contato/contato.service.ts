import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Contato } from "./entity/contato.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ContatoDto } from "./dto/create-contato.dto";
import { Client } from "src/cliente/entity/cliente.entity";

@Injectable()
export class ContatoService{
    constructor(
        @InjectRepository(Contato)
        private contatoRepository: Repository<Contato>,
        @InjectRepository(Client)
        private clientRepository: Repository<Client>
    ){

    }

    async getContato(id: number): Promise<Array<any>> {
        const cliente = await this.clientRepository.findOne({
            where: { id },
            relations: ['contatos'],
        });

        if (!cliente)
            throw new NotFoundException('Cliente não encontrado');

        if (!cliente.contatos || cliente.contatos.length === 0)
            throw new NotFoundException('Não existem contatos para esse cliente');

        return cliente.contatos.map(contato => ({
            id: contato.id,
            tipo: contato.tipo,
            valor: contato.valor,
        }));
}

    async postContato(id: number, contato: ContatoDto): Promise<void>{

        const cliente = await this.clientRepository.findOne({
        where: { id }
    });

        if(!cliente)
            throw new NotFoundException("Usuario nao cadastrado")
        
        const newContato = this.contatoRepository.create({
            valor: contato.valor,
            tipo: contato.tipo,
            client: {id} as Client       
        })
        
        await this.contatoRepository.save(newContato)
    }
    

}