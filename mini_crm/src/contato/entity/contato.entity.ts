import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoContato } from "../enum/contato.enum";
import { Client } from "src/cliente/entity/cliente.entity";
import { Exclude } from "class-transformer";

@Entity({name:'contato_tb'})
export class Contato{

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, default: TipoContato.EMAIL})
    tipo: TipoContato

    @Column({nullable: false})
    valor: string

    @ManyToOne(()=>Client, (client)=> client.contatos)
    @JoinColumn({name: 'id_client'})
    client: Client
}