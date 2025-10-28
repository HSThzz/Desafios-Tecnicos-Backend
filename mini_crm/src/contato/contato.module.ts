import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contato } from "./entity/contato.entity";
import { ContatoController } from "./contato.controller";
import { ContatoService } from "./contato.service";
import { ClienteService } from "src/cliente/cliente.service";
import { Client } from "src/cliente/entity/cliente.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Contato, Client]), Contato],
    controllers: [ContatoController],
    providers: [ContatoService]
})
export class ContatoModule{

}