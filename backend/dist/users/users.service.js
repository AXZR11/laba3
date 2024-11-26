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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const records_entity_1 = require("../records/records.entity");
let UsersService = class UsersService {
    constructor(usersRepository, jwtService, recordsRepository) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.recordsRepository = recordsRepository;
    }
    async register(username, password, email) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.usersRepository.create({
            username,
            password: hashedPassword,
            email
        });
        return this.usersRepository.save(newUser);
    }
    async findById(id) {
        const user = await this.usersRepository.findOne({ where: { id_user: id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByUsername(username) {
        return this.usersRepository.findOne({ where: { username } });
    }
    async validateUser(username, password) {
        const user = await this.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async updateUser(id, userData) {
        const user = await this.usersRepository.findOne({ where: { id_user: id } });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        Object.assign(user, userData);
        return this.usersRepository.save(user);
    }
    async login(user) {
        const payload = { username: user.username, sub: user.id_user };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
    async findAll() {
        return this.usersRepository.find({
            relations: ['records']
        });
    }
    async removeUser(id) {
        const user = await this.usersRepository.findOne({ where: { id_user: id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.recordsRepository.delete({ author: user });
        return this.usersRepository.remove(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.UsersEntity)),
    __param(2, (0, typeorm_2.InjectRepository)(records_entity_1.RecordsEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService,
        typeorm_1.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map