"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '52402b3bd927e6e19d13d623e3107ce099ec01f37f02b149b5e375bb90e362e45d7d4c42932675138f06f4c2931fd9cda7cca232d2c1a98f91e135e8b05d21fbeb036880007ffc123cad2a9c505cc3ecd302f6234b4d491b43b2f571d6b67149951871ecad9d496e559506c2da323f7c853286edee633f6e224c25eb74c9dd39545d41d58040632ba9f22297df57396c690c03c4318a999c6755beda27963b19d3bc41ad6762a28cce765ad67c82db5f2396f4c537958d644e602c2b466c72c5bf6af2b8b47404b302898a81a4287cbc60b32267edb8a5e944d588376164264f1224cca1ef41e75cc8a19a56272bb763a81035f4a081e1318110a49145a648df'
        });
        this.usersService = usersService;
    }
    async validate(payload) {
        return { userId: payload.sub, username: payload.username };
    }
}
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map