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
exports.UsersEntity = void 0;
const records_entity_1 = require("../records/records.entity");
const typeorm_1 = require("typeorm");
let UsersEntity = class UsersEntity {
};
exports.UsersEntity = UsersEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UsersEntity.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], UsersEntity.prototype, "passwordUpdatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', default: '[]' }),
    __metadata("design:type", Array)
], UsersEntity.prototype, "previousPasswords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'user' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UsersEntity.prototype, "isBlocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => records_entity_1.RecordsEntity, (record) => record.author),
    __metadata("design:type", Array)
], UsersEntity.prototype, "records", void 0);
exports.UsersEntity = UsersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UsersEntity);
//# sourceMappingURL=users.entity.js.map