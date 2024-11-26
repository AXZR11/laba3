import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersEntity } from "./users.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(
        @Body() body: { username: string; password: string; email: string }
    ) {
        return this.usersService.register(body.username, body.password, body.email)
    }

    @Post('login')
    async login(
        @Body() body: { username: string; password: string }
    ) {
        const user = await this.usersService.validateUser(body.username, body.password)
        return this.usersService.login(user)
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateUser(
        @Param('id') id: number,
        @Body() userData: Partial<UsersEntity>
    ): Promise<UsersEntity> {
        return this.usersService.updateUser(id, userData)
    }

    @Get('findall')
    @UseGuards(JwtAuthGuard)
    async getAllUsers() {
        return this.usersService.findAll()
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteUsers(id: number): Promise<UsersEntity> {
        return this.usersService.removeUser(id)
    }
}