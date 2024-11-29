import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/users.entity';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(username: string, password: string, email: string): Promise<UsersEntity> {
        return this.usersService.register(username, password, email);
    }

    async login(user: UsersEntity): Promise<{ access_token: string }> {
        const payload = { username: user.username, sub: user.id_user };
        return { access_token: this.jwtService.sign(payload) };
    }

    calculatePasswordLife(passwordUpdatedAt: Date): { daysRemaining: number; isExpiringSoon: boolean } {
        const passwordLifeDays = 113
        const currentDate = new Date()
        const updatedAt = new Date(passwordUpdatedAt)
        const elapsedDays = Math.floor((currentDate.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24))
        const daysRemaining = Math.max(0, passwordLifeDays - elapsedDays)
        const isExpiringSoon = daysRemaining <= 7
        return { daysRemaining, isExpiringSoon }
    }

    async changePassword(id_user: number, currentPassword: string, newPassword: string): Promise<{ message: string }> {
        const user = await this.usersService.findById(id_user);
    
        if (!user || !user.password) {
            throw new UnauthorizedException('Пользователь не найден или пароль не задан');
        }
    
        const hashedCurrentPassword = createHash('sha1').update(currentPassword).digest('hex')
        if (hashedCurrentPassword !== user.password) {
            throw new UnauthorizedException('Текущий пароль неверен')
        }

        const hashedNewPassword = createHash('sha1').update(newPassword).digest('hex')
        for (const oldPassword of user.previousPasswords) {
            if (hashedNewPassword === oldPassword) {
                throw new BadRequestException('Новый пароль не должен совпадать с одним из предыдущих')
            }
        }
    
        if (newPassword.length < 9 || newPassword.length > 19) {
            throw new BadRequestException('Пароль должен быть от 9 до 19 символов');
        }
    
        if (user.previousPasswords.length >= 9) {
            user.previousPasswords.shift();
        }
        user.previousPasswords.push(user.password)
    
        user.password = hashedNewPassword;
        user.passwordUpdatedAt = new Date();
    
        await this.usersService.updateUser(id_user, {
            password: user.password,
            previousPasswords: user.previousPasswords,
            passwordUpdatedAt: user.passwordUpdatedAt,
        });
    
        return { message: 'Пароль успешно изменён' };
    }    
}
