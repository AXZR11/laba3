"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(username, password, email) {
        return this.usersService.register(username, password, email);
    }
    async login(user) {
        const payload = { username: user.username, sub: user.id_user };
        return { access_token: this.jwtService.sign(payload) };
    }
    calculatePasswordLife(passwordUpdatedAt) {
        const passwordLifeDays = 113;
        const currentDate = new Date();
        const updatedAt = new Date(passwordUpdatedAt);
        const elapsedDays = Math.floor((currentDate.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));
        const daysRemaining = Math.max(0, passwordLifeDays - elapsedDays);
        const isExpiringSoon = daysRemaining <= 7;
        return { daysRemaining, isExpiringSoon };
    }
    async changePassword(id_user, currentPassword, newPassword) {
        const user = await this.usersService.findById(id_user);
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException('Пользователь не найден или пароль не задан');
        }
        const hashedCurrentPassword = (0, crypto_1.createHash)('sha1').update(currentPassword).digest('hex');
        if (hashedCurrentPassword !== user.password) {
            throw new common_1.UnauthorizedException('Текущий пароль неверен');
        }
        const hashedNewPassword = (0, crypto_1.createHash)('sha1').update(newPassword).digest('hex');
        for (const oldPassword of user.previousPasswords) {
            if (hashedNewPassword === oldPassword) {
                throw new common_1.BadRequestException('Новый пароль не должен совпадать с одним из предыдущих');
            }
        }
        if (newPassword.length < 9 || newPassword.length > 19) {
            throw new common_1.BadRequestException('Пароль должен быть от 9 до 19 символов');
        }
        if (user.previousPasswords.length >= 9) {
            user.previousPasswords.shift();
        }
        user.previousPasswords.push(user.password);
        user.password = hashedNewPassword;
        user.passwordUpdatedAt = new Date();
        await this.usersService.updateUser(id_user, {
            password: user.password,
            previousPasswords: user.previousPasswords,
            passwordUpdatedAt: user.passwordUpdatedAt,
        });
        return { message: 'Пароль успешно изменён' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map