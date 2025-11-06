import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TipoDocumento } from "../enum/documento.enum";

@Entity({name: 'documento_tb'})
export class Documento{

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 30, type: 'enum'})
    tipoDocumento: TipoDocumento

    @Column({unique: true, nullable: false, length: 300})
    descricao: string

    @Column({nullable: false})
    dataInclusao: Date

    @Column()
    dataAtualizacao: Date

}