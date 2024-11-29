import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddPasswordsLife1732775772505 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
