import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Client } from "./entity/cliente.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientDto } from "./dto/create-client.dto";

@Injectable()
export class ClienteService{

    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>
    ){

    }

    async getClient(id: number): Promise<Client>{

        const client = await this.clientRepository.findOneBy({id})

        if(!client)
            throw new NotFoundException("Cliente nao encontrado")

        return client

    }

    async postClient(client: ClientDto): Promise<void>{

        const existsClient = await this.clientRepository.exists({
            where: {email: client.email}
        }) 

        if(existsClient)
            throw new BadRequestException("Cliente ja cadastrado")

        const newClient = new Client()
        newClient.nome = client.nome
        newClient.email = client.email
        newClient.contatos = client.contatos

        await this.clientRepository.save(newClient)
        
    }
}