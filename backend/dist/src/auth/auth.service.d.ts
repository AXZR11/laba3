import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/users.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(username: string, password: string, email: string): Promise<UsersEntity>;
    login(user: UsersEntity): Promise<{
        access_token: string;
    }>;
    calculatePasswordLife(passwordUpdatedAt: Date): {
        daysRemaining: number;
        isExpiringSoon: boolean;
    };
    changePassword(id_user: number, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
}
