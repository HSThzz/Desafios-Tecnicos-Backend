import { Contato } from "src/contato/entity/contato.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'client_tb'})
export class Client{

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    nome: string

    @Column({unique: true, nullable: false})
    email: string

    @OneToMany(()=> Contato, (contato)=> contato.client, {cascade: true})
    contatos: Contato[]

}