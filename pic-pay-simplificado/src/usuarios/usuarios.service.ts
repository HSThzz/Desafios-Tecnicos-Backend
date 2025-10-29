import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Usuarios } from "./entity/usuarios.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TransacaoDto } from "../transacao/dto/transacao.dto";
import { TipoUsuario } from "./usuarios.enum";
import { UsuariosDto } from "./dto/usuarios.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsuariosService{


    constructor(
        @InjectRepository(Usuarios)
        private usuariosRepository: Repository<Usuarios>
    ){
        
    }

    async hashSenha(senha: string): Promise<string>{
        
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(senha, salt)
        return hash
    }


    async postUsuario(usuario: UsuariosDto): Promise<void>{

        const senha = usuario.senha
        const user = await this.usuariosRepository.findOne({
            where: {cpf: usuario.cpf}
        })
        if(user)
            throw new BadRequestException("Usuario ja cadastrado")
       
        usuario.senha = await this.hashSenha(senha)
        await this.usuariosRepository.save(usuario)
    }
}