import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { TipoTransacao } from "../enum/tipo_transacao.enum"

export class TransacaoDto{

    @IsNumber()
    @IsNotEmpty()
    valor: number

    @IsNumber()
    @IsNotEmpty()
    pagador: number

    @IsNumber()
    @IsNotEmpty()
    recebedor: number

    @IsString()
    @IsNotEmpty()
    tipo_transacao: TipoTransacao


}