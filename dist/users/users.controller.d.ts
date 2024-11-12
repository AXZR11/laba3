import { UsersService } from "./users.service";
import { UsersEntity } from "./users.entity";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(body: {
        username: string;
        password: string;
        email: string;
    }): Promise<UsersEntity>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    updateUser(id: number, userData: Partial<UsersEntity>): Promise<UsersEntity>;
    getAllUsers(): Promise<UsersEntity[]>;
    deleteUsers(id: number): Promise<UsersEntity>;
}
