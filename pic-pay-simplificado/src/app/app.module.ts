import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransacaoModule } from 'src/transacao/transacao.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'pic_pay_simplificado',
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  }),UsuariosModule, TransacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
