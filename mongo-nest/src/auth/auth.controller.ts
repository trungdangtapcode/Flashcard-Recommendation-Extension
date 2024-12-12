import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('auth')
export class AuthController {

    constructor(private AuthService: AuthService) {}

    @Post("/createUser")
    @UsePipes(new ValidationPipe())
    createUser(@Body() CreateUserDto: CreateUserDto){
        return this.AuthService.createUser(CreateUserDto);
    }

    @Get()
    getUser(){
        return this.AuthService.getUser();
    }
}