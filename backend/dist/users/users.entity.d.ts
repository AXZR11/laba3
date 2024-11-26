import { RecordsEntity } from "../records/records.entity";
export declare class UsersEntity {
    id_user: number;
    username: string;
    password: string;
    email: string;
    records: RecordsEntity[];
}
