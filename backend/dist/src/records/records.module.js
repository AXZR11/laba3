"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordsModule = void 0;
const common_1 = require("@nestjs/common");
const records_service_1 = require("./records.service");
const records_controller_1 = require("./records.controller");
const typeorm_1 = require("@nestjs/typeorm");
const records_entity_1 = require("./records.entity");
const users_module_1 = require("src/users/users.module");
let RecordsModule = class RecordsModule {
};
exports.RecordsModule = RecordsModule;
exports.RecordsModule = RecordsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([records_entity_1.RecordsEntity]),
            users_module_1.UsersModule
        ],
        controllers: [records_controller_1.RecordsController],
        providers: [records_service_1.RecordsService]
    })
], RecordsModule);
//# sourceMappingURL=records.module.js.map