import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuarios } from "./entity/usuarios.entity";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios]), Usuarios],
    controllers: [UsuariosController],
    providers: [UsuariosService]
})
export class UsuariosModule{

}