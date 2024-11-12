import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsersEntity } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { RecordsEntity } from "src/records/records.entity";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
        private jwtService: JwtService,
        @InjectRepository(RecordsEntity)
        private recordsRepository: Repository<RecordsEntity>
    ) {}

    async register(username: string, password: string, email: string): Promise<UsersEntity> {
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = this.usersRepository.create({
            username,
            password: hashedPassword,
            email
        })
        return this.usersRepository.save(newUser)
    }

    async findById(id: number): Promise<UsersEntity> {
        const user = await this.usersRepository.findOne({ where: { id_user: id } })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async findByUsername(username: string): Promise<UsersEntity> {
        return this.usersRepository.findOne({ where: { username } })
    }

    async validateUser(username: string, password: string): Promise<UsersEntity> {
        const user = await this.findByUsername(username)
        if (user && await bcrypt.compare(password, user.password)) {
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