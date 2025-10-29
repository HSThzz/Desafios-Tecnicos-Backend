import { Usuarios } from "src/usuarios/entity/usuarios.entity"
import { TipoTransacao } from "../dto/tipo_transacao.enum"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Transacao{
    
    @PrimaryGeneratedColumn()
    id_transacao: number

    @Column({nullable: false})
    valor: number

    @Column({nullable: false, enum: TipoTransacao, type: 'enum'})
    tipo_transacao: TipoTransacao

    @Column({nullable: false})
    recebedor: number

    @JoinColumn({name: 'id_usuario'})
    @ManyToOne(()=> Usuarios, (user)=> user.transacao)
    usuario: Usuarios
}