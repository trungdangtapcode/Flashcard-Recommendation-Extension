import {Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.chema';
import { AuthService } from './auth.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },

        ]),
    ],
    providers:[
        AuthService
    ]
    ,
    controllers: [AuthController],
})

export class AuthModule {};