import { RecordsEntity } from "../records/records.entity";
export declare class UsersEntity {
    id_user: number;
    username: string;
    password: string;
    passwordUpdatedAt: Date | null;
    previousPasswords: string[];
    role: string;
    isBlocked: boolean;
    email: string;
    records: RecordsEntity[];
}
