import {Module} from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { AuthModule } from '@/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { AccountModule } from '@/account/account.module';

@Module({
    imports:[
        AuthModule, HttpModule, AccountModule
    ],
    providers:[
        QueryService
    ]
    ,
    controllers: [QueryController],
})

export class QueryModule {};