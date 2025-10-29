import { Module } from "@nestjs/common";
import { Usuarios } from "src/usuarios/entity/usuarios.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auth.constants";

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios]), JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '120s'}
    })],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule{

}