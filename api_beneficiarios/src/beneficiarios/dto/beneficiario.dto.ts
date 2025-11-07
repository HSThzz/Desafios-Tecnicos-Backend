import { IsNotEmpty } from "@nestjs/class-validator"
import { IsString, MaxLength, MinLength } from "class-validator"

export class BeneficiarioDto{
        
        @IsNotEmpty()
        @IsString()
        @MaxLength(100)
        @MinLength(3)
        nome: string
        
        @IsNotEmpty()
        @IsString()
        telefone: string
        
        @IsNotEmpty()
        @IsString()
        dataNascimento?: string
        
}