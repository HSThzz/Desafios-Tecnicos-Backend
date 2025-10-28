import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from 'src/cliente/cliente.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContatoModule } from 'src/contato/contato.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'mini_crm_db',
    username: 'postgres',
    password: 'postgres',
    autoLoadEntities: true,
    synchronize: true,

  }), ClienteModule, ContatoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
