import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Usuarios } from "./entity/usuarios.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TransacaoDto } from "../transacao/dto/transacao.dto";
import { TipoUsuario } from "./usuarios.enum";
import { UsuariosDto } from "./dto/usuarios.dto";

@Injectable()
export class UsuariosService{


    constructor(
        @InjectRepository(Usuarios)
        private usuariosRepository: Repository<Usuarios>
    ){
        
    }


    async postUsuario(usuario: UsuariosDto): Promise<void>{

        const user = await this.usuariosRepository.findOne({
            where: {cpf: usuario.cpf}
        })
        if(user)
            throw new BadRequestException("Usuario ja cadastrado")

        await this.usuariosRepository.save(usuario)
    }
}