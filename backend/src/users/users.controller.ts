import { Request, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersEntity } from "./users.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/roles/roles.decorator";

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

    @Put(':id/block')
    @Roles('admin')
    @UseGuards(JwtAuthGuard)
    async blockUser(@Param('id') id: number) {
        return this.usersService.blockUser(id)
    }

    @Put(':id/unblock')
    @Roles('admin')
    @UseGuards(JwtAuthGuard)
    async unblockUser(@Param('id') id: number, @Query('adminId') adminId: number) {
        return this.usersService.unblockUser(id, adminId)
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getCurrentUser(@Request() req): Promise<Partial<UsersEntity>> {
        const user = await this.usersService.findById(req.user.userId);
        return {
            id_user: user.id_user,
            username: user.username,
            email: user.email,
            role: user.role,
            isBlocked: user.isBlocked,
        }
    }

}