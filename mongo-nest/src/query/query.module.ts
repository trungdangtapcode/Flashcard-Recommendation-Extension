import {Module} from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { AuthModule } from '@/auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports:[
        AuthModule, HttpModule
    ],
    providers:[
        QueryService
    ]
    ,
    controllers: [QueryController],
})

export class QueryModule {};