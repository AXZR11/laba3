import { UsersEntity } from "../users/users.entity";
export declare class RecordsEntity {
    id_record: number;
    title: string;
    content: string;
    createdAt: Date;
    author: UsersEntity;
    authorIdUser: number;
}
