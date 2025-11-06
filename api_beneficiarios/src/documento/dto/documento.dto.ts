import { IsNotEmpty } from "@nestjs/class-validator"
import { IsEnum, IsString, maxLength, MaxLength, MinLength } from "class-validator"
import { TipoDocumento } from "../enum/documento.enum"

export class DocumentoDto{
        
        @IsNotEmpty()
        // @IsEnum(TipoDocumento)
        @MinLength(3)
        tipoDocumento: TipoDocumento
        
        @IsNotEmpty()
        @MaxLength(300)
        @IsString()
        descricao: string
        
        @IsNotEmpty()
        @IsString()
        dataNascimento: string
        
}