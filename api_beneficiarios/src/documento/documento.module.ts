import { Module } from "@nestjs/common";
import { DocumentoController } from "./documento.controller";
import { DocumentoService } from "./documento.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Documento } from "./entity/documento.entity";
import { Beneficiario } from "src/beneficiarios/entity/beneficiario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Documento, Beneficiario]), Documento],
    controllers: [DocumentoController],
    providers: [DocumentoService]
})
export class DocumentoModule{

}