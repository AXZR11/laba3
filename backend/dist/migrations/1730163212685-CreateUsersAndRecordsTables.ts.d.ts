import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateUsersAndRecordsTables1730163212685 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
