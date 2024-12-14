import {Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.chema';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports:[
        PassportModule,
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },

        ]),
        JwtModule.register({
            secret: process.env.JWT_SECRETORKEY, // Use a secure secret in production
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers:[
        AuthService,  LocalStrategy, JwtStrategy
    ]
    ,
    controllers: [AuthController],
})

export class AuthModule {};