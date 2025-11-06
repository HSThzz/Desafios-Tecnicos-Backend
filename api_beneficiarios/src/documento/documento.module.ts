import { Module } from "@nestjs/common";
import { DocumentoController } from "./documento.controller";
import { DocumentoService } from "./documento.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Documento } from "./entity/documento.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Documento]), Documento],
    controllers: [DocumentoController],
    providers: [DocumentoService]
})
export class DocumentoModule{

}