import { Request, BadRequestException, Body, Controller, Post, UnauthorizedException, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @Post('register')
    async register(@Body() body: { username: string; password: string; email: string }) {
        return this.authService.register(body.username, body.password, body.email);
    }

    @Post('login')
    async login(
        @Body() body: { username: string; password: string }
    ) {
        const user = await this.usersService.validateUser(body.username, body.password)
        if (!user) {
            throw new UnauthorizedException()
        }
        return this.authService.login(user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    async changePassword(
        @Body() body: { currentPassword: string; newPassword: string },
        @Request() req
    ) {
        const { currentPassword, newPassword } = body
        const userId = req.user?.userId;

        console.log('Request Body:', body);
        console.log('User ID:', userId);

        if (!currentPassword || !newPassword) {
            throw new BadRequestException('Укажите текущий и новый пароль')
        }

        return await this.authService.changePassword(userId, currentPassword, newPassword)
    }

    @UseGuards(JwtAuthGuard)
    @Get('password-life')
    async getPasswordLife(@Request() req): Promise<{ daysRemaining: number; isExpiringSoon: boolean }> {
        const user = await this.usersService.findById(req.user.userId)
        if (!user || !user.passwordUpdatedAt) {
            throw new BadRequestException('Данные о пароле недоступны')
        }
        return this.authService.calculatePasswordLife(user.passwordUpdatedAt)
    }
}