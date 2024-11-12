import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(body: {
        username: string;
        password: string;
        email: string;
    }): Promise<import("../users/users.entity").UsersEntity>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
