import { IsEmail, IsString, MaxLength } from "class-validator"
import { Contato } from "src/contato/entity/contato.entity"

export class ClientDto{

    @MaxLength(100)
    @IsString()
    nome: string

    @MaxLength(100)
    @IsEmail()
    email: string

    contatos: Contato[]
}