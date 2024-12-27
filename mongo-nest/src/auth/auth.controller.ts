import {Body, Controller, Get, Post, Req, UseFilters, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { MongoExceptionFilter } from '@/validation-error.filter';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { UpdateUserDto } from './dto/UpdateUser.dto';

interface IJwdPayloadUserId {
    id: string, 
    iat: number,
    exp: number
}

@Controller('auth')
export class AuthController {

    constructor(private AuthService: AuthService) {}

    @Post("/createUser")
    @UsePipes(new ValidationPipe())
    @UseFilters(new MongoExceptionFilter())
    createUser(@Body() CreateUserDto: CreateUserDto){
        console.log(CreateUserDto)
        return this.AuthService.createUser(CreateUserDto);
    }

    @Post("/login")
    @UseGuards(LocalGuard)
    @UseFilters(new MongoExceptionFilter())
    verifyUser(@Req() req: Request){
        console.log('In Verify User (Controller)');
        return req.user;
    }

    @Get('status')
    @UseGuards(JwtGuard)
    getUser(@Req() req: Request){
        const id = (req.user as IJwdPayloadUserId).id
        const userData = this.AuthService.getUser(id);
        return userData;
    }

    @Post('update')
    @UseGuards(JwtGuard)
    getUpdate(@Req() req: Request, @Body() UpdateUserDto: UpdateUserDto){
        const id = (req.user as IJwdPayloadUserId).id
        return this.AuthService.updateUser(id, UpdateUserDto);
    }
}