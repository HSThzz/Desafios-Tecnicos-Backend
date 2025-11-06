import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Beneficiario } from "./entity/beneficiario.entity";
import { BeneficiariosController } from "./beneficiarios.controller";
import { BeneficiariosService } from "./beneficiarios.service";

@Module({
    imports: [TypeOrmModule.forFeature([Beneficiario]), Beneficiario],
    controllers: [BeneficiariosController],
    providers: [BeneficiariosService]
})
export class BeneficiariosModule{

}