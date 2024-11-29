import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsersEntity } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { RecordsEntity } from "src/records/records.entity";
import { createHash } from "crypto";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
        private jwtService: JwtService,
        @InjectRepository(RecordsEntity)
        private recordsRepository: Repository<RecordsEntity>
    ) {}

    private hashPassword(password: string): string {
        return createHash('sha1').update(password).digest('hex')
    }

    async register(username: string, password: string, email: string): Promise<UsersEntity> {
        const hashedPassword = this.hashPassword(password)
        const newUser = this.usersRepository.create({
            username,
            password: hashedPassword,
            email,
        })
        newUser.passwordUpdatedAt = new Date()

        return this.usersRepository.save(newUser)
    }

    async findById(id: number): Promise<UsersEntity> {
        const user = await this.usersRepository.findOne({ where: { id_user: id } })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async blockUser(id: number): Promise<{ message: string }> {
        const user = await this.findById(id)
        user.isBlocked = true
        await this.usersRepository.save(user)
        return { message: 'Аккаунт успешно заблокирован' }
    }

    async unblockUser(id: number, adminId: number): Promise<{ message: string }> {
        const admin = await this.findById(adminId)
        if (admin.role !== 'admin') {
            throw new UnauthorizedException('Только админ может разблокировать пользователей')
        }
        const user = await this.findById(id)
        user.isBlocked = false
        await this.usersRepository.save(user)
        return { message: 'Аккаунт пользователя успешно разблокирован' }
    }

    async findByUsername(username: string): Promise<UsersEntity> {
        return this.usersRepository.findOne({ where: { username } })
    }

    async updatePassword(id_user: number, hashedPassword: string): Promise<void> {
        await this.usersRepository.update({ id_user }, { password: hashedPassword })
    }

    async validateUser(username: string, password: string): Promise<UsersEntity> {
        const user = await this.findByUsername(username)
        const hashedPassword = this.hashPassword(password)

        if (user && hashedPassword === user.password) {
            return user
        }
        throw new UnauthorizedException('Invalid credentials')
    }

    async updateUser(id: number, userData: Partial<UsersEntity>): Promise<UsersEntity> {
        const user = await this.usersRepository.findOne({ where: { id_user: id } })
        
        if (!user) {
            throw new NotFoundException('Пользователь не найден')
        }

        Object.assign(user, userData)

        return this.usersRepository.save(user)
    }

    async login(user: UsersEntity): Promise<{ access_token: string }> {
        const payload = { username: user.username, sub: user.id_user }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async findAll () {
        return this.usersRepository.find({
            relations: ['records']
        })
    }

    async removeUser (id: number): Promise<UsersEntity> {
        const user = await this.usersRepository.findOne({ where: { id_user: id } })
        if (!user) {
            throw new NotFoundException('User not found')
        }

        await this.recordsRepository.delete({ author: user })
        return this.usersRepository.remove(user)
    }
}