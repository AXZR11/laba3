import { Repository } from "typeorm";
import { UsersEntity } from "./users.entity";
import { JwtService } from "@nestjs/jwt";
import { RecordsEntity } from "src/records/records.entity";
export declare class UsersService {
    private usersRepository;
    private jwtService;
    private recordsRepository;
    constructor(usersRepository: Repository<UsersEntity>, jwtService: JwtService, recordsRepository: Repository<RecordsEntity>);
    register(username: string, password: string, email: string): Promise<UsersEntity>;
    findById(id: number): Promise<UsersEntity>;
    findByUsername(username: string): Promise<UsersEntity>;
    validateUser(username: string, password: string): Promise<UsersEntity>;
    updateUser(id: number, userData: Partial<UsersEntity>): Promise<UsersEntity>;
    login(user: UsersEntity): Promise<{
        access_token: string;
    }>;
    findAll(): Promise<UsersEntity[]>;
    removeUser(id: number): Promise<UsersEntity>;
}
