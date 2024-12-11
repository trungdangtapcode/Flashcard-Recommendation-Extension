import {Controller, Post} from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post()
    createAccount(): string{
        return 'create account 2';
    }
}