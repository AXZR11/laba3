import { RecordsService } from "./records.service";
import { RecordsEntity } from "./records.entity";
export declare class RecordsController {
    private readonly recordsService;
    constructor(recordsService: RecordsService);
    createRecord(recordData: RecordsEntity, req: any): Promise<{
        message: string;
        title: string;
    } | {
        error: string;
    }>;
    getAllRecords(): Promise<RecordsEntity[]>;
    search(query: string): Promise<RecordsEntity[]>;
    getRecordById(id_record: string, req: any): Promise<RecordsEntity | {
        error: string;
    }>;
    updateRecords(id_record: number, recordData: Partial<RecordsEntity>, req: any): Promise<RecordsEntity | {
        error: string;
    }>;
    deleteRecord(id_record: number, req: any): Promise<{
        message: string;
    }>;
}
