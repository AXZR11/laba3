import { Body, Controller, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
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
}