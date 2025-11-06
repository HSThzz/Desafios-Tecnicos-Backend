import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentoModule } from 'src/documento/documento.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'beneficiarios',
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: true
  }), DocumentoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
