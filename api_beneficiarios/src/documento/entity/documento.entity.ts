import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoDocumento } from "../enum/documento.enum";
import { Beneficiario } from "src/beneficiarios/entity/beneficiario.entity";

@Entity({name: 'documento_tb'})
export class Documento{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'enum', enum: TipoDocumento})
    tipoDocumento: TipoDocumento

    @Column({unique: true, nullable: false, length: 300})
    descricao: string

    @Column({nullable: false})
    dataInclusao: Date

    @Column()
    dataAtualizacao: Date


    @ManyToOne(()=> Beneficiario, (beneficiario)=>beneficiario.documentos, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'beneficiario_id'})
    beneficiario: Beneficiario

}