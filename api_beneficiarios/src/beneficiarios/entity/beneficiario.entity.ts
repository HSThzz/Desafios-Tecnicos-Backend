import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'beneficiario_tb'})
export class Beneficiario{

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100})
    nome: string
    @Column({unique: true, nullable: false})
    telefone: string
    @Column({nullable: false})
    dataNascimento: string
    @Column({nullable: false})
    dataInclusao: string
    @Column()
    dataAtualizacao: string

}