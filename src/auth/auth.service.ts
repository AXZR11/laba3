import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/users.entity';

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
}
