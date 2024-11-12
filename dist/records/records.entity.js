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
exports.RecordsEntity = void 0;
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let RecordsEntity = class RecordsEntity {
};
exports.RecordsEntity = RecordsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RecordsEntity.prototype, "id_record", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecordsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], RecordsEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RecordsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UsersEntity, user => user.records, { nullable: true }),
    __metadata("design:type", users_entity_1.UsersEntity)
], RecordsEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'authorIdUser', nullable: true }),
    __metadata("design:type", Number)
], RecordsEntity.prototype, "authorIdUser", void 0);
exports.RecordsEntity = RecordsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'records' })
], RecordsEntity);
//# sourceMappingURL=records.entity.js.map