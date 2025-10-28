import { IsNotEmpty, IsNumber } from "class-validator"

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


}