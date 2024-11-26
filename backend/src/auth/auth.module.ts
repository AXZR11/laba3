import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { UsersService } from "src/users/users.service";

@Module({
    imports: [
        JwtModule.register({
            secret: '52402b3bd927e6e19d13d623e3107ce099ec01f37f02b149b5e375bb90e362e45d7d4c42932675138f06f4c2931fd9cda7cca232d2c1a98f91e135e8b05d21fbeb036880007ffc123cad2a9c505cc3ecd302f6234b4d491b43b2f571d6b67149951871ecad9d496e559506c2da323f7c853286edee633f6e224c25eb74c9dd39545d41d58040632ba9f22297df57396c690c03c4318a999c6755beda27963b19d3bc41ad6762a28cce765ad67c82db5f2396f4c537958d644e602c2b466c72c5bf6af2b8b47404b302898a81a4287cbc60b32267edb8a5e944d588376164264f1224cca1ef41e75cc8a19a56272bb763a81035f4a081e1318110a49145a648df',
            signOptions: { expiresIn: '1000s' }
        }),
        forwardRef(() => UsersModule)
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}