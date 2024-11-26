"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("../users/users.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: '52402b3bd927e6e19d13d623e3107ce099ec01f37f02b149b5e375bb90e362e45d7d4c42932675138f06f4c2931fd9cda7cca232d2c1a98f91e135e8b05d21fbeb036880007ffc123cad2a9c505cc3ecd302f6234b4d491b43b2f571d6b67149951871ecad9d496e559506c2da323f7c853286edee633f6e224c25eb74c9dd39545d41d58040632ba9f22297df57396c690c03c4318a999c6755beda27963b19d3bc41ad6762a28cce765ad67c82db5f2396f4c537958d644e602c2b466c72c5bf6af2b8b47404b302898a81a4287cbc60b32267edb8a5e944d588376164264f1224cca1ef41e75cc8a19a56272bb763a81035f4a081e1318110a49145a648df',
                signOptions: { expiresIn: '1000s' }
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule)
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map