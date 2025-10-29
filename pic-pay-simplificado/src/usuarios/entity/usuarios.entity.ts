import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TipoUsuario } from "../usuarios.enum";
import { Transacao } from "src/transacao/entity/transacao.entity";

@Entity()
export class Usuarios{
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 11, unique: true})
    cpf: string

    @Column({length: 100})
    nome_completo: string

    @Column({nullable: false})
    tipo_usuario: TipoUsuario


    @Column({length: 100, unique: true})
    email: string

    @Column({length: 100, nullable: false})
    senha: string

    @Column({default: 0})
    saldo: number

    @OneToMany(()=> Transacao, (transacao)=> transacao.usuario, {cascade: true})
    transacao: Transacao[]
}