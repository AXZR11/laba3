import { Repository } from "typeorm";
import { RecordsEntity } from "./records.entity";
import { UsersService } from "src/users/users.service";
export declare class RecordsService {
    private recordsRepository;
    private usersService;
    constructor(recordsRepository: Repository<RecordsEntity>, usersService: UsersService);
    createRecord(recordData: Partial<RecordsEntity> & {
        authorIdUser: number;
    }, userId: number): Promise<RecordsEntity>;
    getAll(): Promise<RecordsEntity[]>;
    updateRecord(id_record: number, recordData: Partial<RecordsEntity>, userId: number): Promise<RecordsEntity>;
    removeRecord(id_record: number, userId: number): Promise<RecordsEntity>;
    getRecordById(id_record: string | number, userId: number): Promise<RecordsEntity>;
    searchRecords(query: string): Promise<RecordsEntity[]>;
}
