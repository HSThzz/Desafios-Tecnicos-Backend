import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuarios } from "src/usuarios/entity/usuarios.entity";
import { TransacaoController } from "./transacao.controller";
import { TransacaoService } from "./transacao.service";

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios])],
    controllers: [TransacaoController],
    providers: [TransacaoService]
})
export class TransacaoModule{

}