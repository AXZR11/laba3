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
exports.RecordsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const records_entity_1 = require("./records.entity");
const users_service_1 = require("src/users/users.service");
let RecordsService = class RecordsService {
    constructor(recordsRepository, usersService) {
        this.recordsRepository = recordsRepository;
        this.usersService = usersService;
    }
    async createRecord(recordData, userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const newRecord = this.recordsRepository.create({
            ...recordData,
            author: user,
            authorIdUser: user.id_user
        });
        const savedRecord = await this.recordsRepository.save(newRecord);
        console.log('Record successfully created');
        return savedRecord;
    }
    async getAll() {
        return this.recordsRepository.find();
    }
    async updateRecord(id_record, recordData, userId) {
        const record = await this.recordsRepository.findOne({ where: { id_record, authorIdUser: userId } });
        if (!record) {
            throw new common_1.NotFoundException('This record not found');
        }
        Object.assign(record, recordData);
        await this.recordsRepository.save(record);
        console.log('Record update successfully');
        return record;
    }
    async removeRecord(id_record, userId) {
        const removedItem = await this.recordsRepository.findOne({ where: { id_record, authorIdUser: userId } });
        if (!removedItem) {
            throw new common_1.NotFoundException('This record not found');
        }
        return this.recordsRepository.remove(removedItem);
    }
    async getRecordById(id_record, userId) {
        if (typeof id_record !== 'number' || isNaN(id_record)) {
            throw new common_1.BadRequestException('Invalid record ID');
        }
        console.log('getRecordById controller called with id:', id_record);
        const record = await this.recordsRepository.findOne({ where: { id_record, authorIdUser: userId } });
        console.log('Found record:', record);
        if (!record) {
            throw new common_1.NotFoundException('This record not found');
        }
        return record;
    }
    async searchRecords(query) {
        return this.recordsRepository.find({
            where: [
                { title: (0, typeorm_2.Like)(`%${query}%`) },
                { content: (0, typeorm_2.Like)(`%${query}%`) },
            ]
        });
    }
};
exports.RecordsService = RecordsService;
exports.RecordsService = RecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(records_entity_1.RecordsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], RecordsService);
//# sourceMappingURL=records.service.js.map