import { UsersService } from "src/users/users.service";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(payload: {
        sub: number;
        username: string;
    }): Promise<{
        userId: number;
        username: string;
    }>;
}
export {};
