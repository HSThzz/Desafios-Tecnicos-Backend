import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { TipoUsuario } from "../usuarios.enum"

export class UsuariosDto{
    @IsNotEmpty()
    @IsString()
    cpf: string
    
    @MaxLength(100)
    @MinLength(2)
    nome_completo: string
    
    @IsNotEmpty()
    tipo_usuario: TipoUsuario

    @MaxLength(100)
    @IsEmail()
    @IsNotEmpty()
    email: string

    @MaxLength(100)
    @MinLength(5)
    @IsString()
    @IsNotEmpty()
    senha: string

    @IsNumber()
    saldo: number
}