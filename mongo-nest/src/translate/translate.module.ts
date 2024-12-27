import {Module} from '@nestjs/common';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';


@Module({
    imports:[
    ],
    providers:[
        TranslateService
    ]
    ,
    controllers: [TranslateController],
})

export class TranslateModule {};