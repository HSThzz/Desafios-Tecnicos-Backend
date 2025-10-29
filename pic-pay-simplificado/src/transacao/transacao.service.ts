import { BadRequestException, GatewayTimeoutException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuarios } from "src/usuarios/entity/usuarios.entity";
import { EntityManager, Repository } from "typeorm";
import { TransacaoDto } from "./dto/transacao.dto";
import { TipoUsuario } from "src/usuarios/usuarios.enum";
import axios from "axios";
import { Transacao } from "./entity/transacao.entity";

@Injectable()
export class TransacaoService{

    constructor(
        @InjectRepository(Usuarios)
        private usuariosRepository: Repository<Usuarios>,

        @InjectRepository(Transacao)
        private transacaoRepository: Repository<Transacao>
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

    async verificaAutenticacao(){
            try{
                const resposta = await axios.get("https://util.devi.tools/api/v2/authorize")
                if (resposta.data.status === "fail" || resposta.data.data?.authorization === false) {
                    throw new UnauthorizedException("Transação não autorizada pelo serviço externo");
        }
            }catch(erro){
                throw new UnauthorizedException("Erro ao validar transação")
            }     
    }

    async enviaNotificacao(){
        try{
            await axios.post("https://util.devi.tools/api/v1/notify")
        }catch(erro){
            throw new GatewayTimeoutException("Falha ao enviar notificação")
        }
    }
    

    async realizaTransacao(transacaoDto: TransacaoDto): Promise<void>{

            const idPagador = transacaoDto.pagador
            const idRecebedor = transacaoDto.recebedor
            const valor = transacaoDto.valor
            
            if(idPagador === idRecebedor)
                throw new BadRequestException("Nao é permitido transferir para si mesmo");
    
            const pagador = await this.getUsuario(idPagador)
            const recebedor = await this.getUsuario(idRecebedor)
    
            this.verificaSaldo(pagador, valor)
            this.verificaTipo(pagador)

            await this.usuariosRepository.manager.transaction(async (manager)=>{
                
                
                await this.verificaAutenticacao()
                
                pagador.saldo -= valor
                recebedor.saldo += valor

                await manager.save(pagador);
                await manager.save(recebedor);
                await this.salvaTransacao(transacaoDto, manager)
                await this.enviaNotificacao()
                

            })
        }
    async salvaTransacao(transacaoDto: TransacaoDto, manager: EntityManager): Promise<void>{
            const idPagador = transacaoDto.pagador
            const idRecebedor = transacaoDto.recebedor

            const transacao = manager.create(Transacao, {
                recebedor: idRecebedor,
                valor: transacaoDto.valor,
                tipo_transacao: transacaoDto.tipo_transacao,
                usuario: {id: idPagador}
            })
            await manager.save(transacao)
        
    } 

}