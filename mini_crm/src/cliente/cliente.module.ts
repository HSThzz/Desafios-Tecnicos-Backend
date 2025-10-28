import { Module } from "@nestjs/common";
import { ClienteController } from "./cliente.controller";
import { Client } from "./entity/cliente.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteService } from "./cliente.service";
import { Contato } from "src/contato/entity/contato.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Client, Contato]), Client],
    controllers: [ClienteController],
    providers: [ClienteService]
})
export class ClienteModule{

}