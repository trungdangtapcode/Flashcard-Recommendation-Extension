import {Module} from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';

@Module({
    imports:[
    ],
    providers:[
        QueryService
    ]
    ,
    controllers: [QueryController],
})

export class QueryModule {};