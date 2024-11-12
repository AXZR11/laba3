import { Module } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { RecordsController } from "./records.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecordsEntity } from "./records.entity";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([RecordsEntity]),
        UsersModule
    ],
    controllers: [RecordsController],
    providers: [RecordsService]
})
export class RecordsModule {}