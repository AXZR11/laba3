import { Repository } from "typeorm";
import { UsersEntity } from "./users.entity";
import { JwtService } from "@nestjs/jwt";
import { RecordsEntity } from "src/records/records.entity";
export declare class UsersService {
    private usersRepository;
    private jwtService;
    private recordsRepository;
    constructor(usersRepository: Repository<UsersEntity>, jwtService: JwtService, recordsRepository: Repository<RecordsEntity>);
    private hashPassword;
    register(username: string, password: string, email: string): Promise<UsersEntity>;
    findById(id: number): Promise<UsersEntity>;
    blockUser(id: number): Promise<{
        message: string;
    }>;
    unblockUser(id: number, adminId: number): Promise<{
        message: string;
    }>;
    findByUsername(username: string): Promise<UsersEntity>;
    updatePassword(id_user: number, hashedPassword: string): Promise<void>;
    validateUser(username: string, password: string): Promise<UsersEntity>;
    updateUser(id: number, userData: Partial<UsersEntity>): Promise<UsersEntity>;
    login(user: UsersEntity): Promise<{
        access_token: string;
    }>;
    findAll(): Promise<UsersEntity[]>;
    removeUser(id: number): Promise<UsersEntity>;
}
