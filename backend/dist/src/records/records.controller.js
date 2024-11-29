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
exports.RecordsController = void 0;
const common_1 = require("@nestjs/common");
const records_service_1 = require("./records.service");
const records_entity_1 = require("./records.entity");
const jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
let RecordsController = class RecordsController {
    constructor(recordsService) {
        this.recordsService = recordsService;
    }
    async createRecord(recordData, req) {
        const userId = req.user.userId;
        const newRecord = await this.recordsService.createRecord(recordData, userId);
        return {
            message: 'Record successfully created',
            title: newRecord.title
        };
    }
    async getAllRecords() {
        return this.recordsService.getAll();
    }
    async search(query) {
        return this.recordsService.searchRecords(query);
    }
    async getRecordById(id_record, req) {
        console.log('Received ID:', id_record);
        const userId = req.user.userId;
        try {
            const record = await this.recordsService.getRecordById(+id_record, userId);
            return record;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return { error: error.message };
            }
            throw error;
        }
    }
    async updateRecords(id_record, recordData, req) {
        const userId = req.user.userId;
        try {
            const result = await this.recordsService.updateRecord(+id_record, recordData, userId);
            return result;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return { error: error.message };
            }
            throw error;
        }
    }
    async deleteRecord(id_record, req) {
        const userId = req.user.userId;
        await this.recordsService.removeRecord(+id_record, userId);
        return { message: 'Record successfully removed' };
    }
};
exports.RecordsController = RecordsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [records_entity_1.RecordsEntity, Object]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "getAllRecords", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "getRecordById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "updateRecords", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "deleteRecord", null);
exports.RecordsController = RecordsController = __decorate([
    (0, common_1.Controller)('api/records'),
    __metadata("design:paramtypes", [records_service_1.RecordsService])
], RecordsController);
//# sourceMappingURL=records.controller.js.map