import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuarios } from "src/usuarios/entity/usuarios.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService{

    constructor(
        @InjectRepository(Usuarios)
        private usuarioRepository: Repository<Usuarios>){}

        async realizaLogin(loginDto: LoginDto): Promise<any>{

            const usuario = await this.usuarioRepository.findOne({
                where: {email: loginDto.email}
            })
            if(!usuario)
                throw new NotFoundException("Usuario nao encontrado")

            const isMatch = await bcrypt.compare(loginDto.senha, usuario?.senha)

            if(!isMatch)
                throw new UnauthorizedException("Senha incorreta")

        }
}