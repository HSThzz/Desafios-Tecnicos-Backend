import { Module } from "@nestjs/common";
import { Usuarios } from "src/usuarios/entity/usuarios.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule{

}