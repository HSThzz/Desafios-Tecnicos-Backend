import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { TipoContato } from "../enum/contato.enum";

export class ContatoDto{

    @IsNotEmpty()
    tipo: TipoContato

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    valor: string

    // @IsNotEmpty()
    // @IsString()
    // client: string
}