import {Module} from '@nestjs/common';
import AccountController from './account.controller';
import AccountService from './account.service';
import { AuthModule } from '@/auth/auth.module';

@Module({
    imports:[
		AuthModule
    ],
    providers:[
		AccountService
    ]
    ,
    controllers: [AccountController],
    exports: [AccountService]
})

export class AccountModule {};