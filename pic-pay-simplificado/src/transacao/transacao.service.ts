import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuarios } from "src/usuarios/entity/usuarios.entity";
import { Repository } from "typeorm";
import { TransacaoDto } from "./dto/transacao.dto";
import { TipoUsuario } from "src/usuarios/usuarios.enum";
import axios from "axios";

@Injectable()
export class TransacaoService{

    constructor(
        @InjectRepository(Usuarios)
        private usuariosRepository: Repository<Usuarios>
    ){

    }

    async getUsuario(id: number): Promise<Usuarios>{
        const user = await this.usuariosRepository.findOne({
            where: {id: id}
        })
        if(!user)
            throw new NotFoundException("Usuario nao encontrado")
        return user
    }

    verificaSaldo(user: Usuarios, valor: number): boolean{
        if(user.saldo < valor)
            throw new BadRequestException("Saldo insuficiente")
        if(valor < 0)
            throw new BadRequestException("Valor deve ser positivo")
        return true
    }
    verificaTipo(user: Usuarios): boolean{
        if(user.tipo_usuario === TipoUsuario.LOJISTA)
            throw new BadRequestException("Somente usuarios podem realizar transferencia")
        return true
    }

    async postTransacao({pagador: idPagador, recebedor: idRecebedor, valor}: TransacaoDto): Promise<void>{

            if(idPagador === idRecebedor)
                throw new BadRequestException("Nao é permitido transferir para si mesmo");
    
            const pagador = await this.getUsuario(idPagador)
            const recebedor = await this.getUsuario(idRecebedor)
    
            this.verificaSaldo(pagador, valor)
            this.verificaTipo(pagador)

            await this.usuariosRepository.manager.transaction(async (manager)=>{
                
                let resposta: any
                try{
                    resposta = await axios.get("https://util.devi.tools/api/v2/authorize")
                }catch{
                    throw new BadRequestException("Erro ao validar transação")
                }
                
                if((!resposta.data.data.authorization))
                    throw new UnauthorizedException("Transação nao autorizada")

                pagador.saldo -= valor
                recebedor.saldo += valor

                await manager.save(pagador);
                await manager.save(recebedor);
            })
        } 

}