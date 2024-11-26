import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';
import { RecordsEntity } from './records/records.entity';
import { AppDataSource } from './data-source'
import { UsersModule } from './users/users.module';
import { RecordsModule } from './records/records.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([UsersEntity, RecordsEntity]),
    UsersModule,
    AuthModule,
    RecordsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
