import {Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';

import { JwtGuard } from "@/auth/guards/jwt.guard";
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserHistoryDto } from './dto/UserHistory.dto';
import { UserPointUpdateDto } from './dto/UserPointUpdate.dto';
import { Request } from 'express';
import AccountService from './account.service';

interface IJwdPayloadUserId {
    id: string, 
    iat: number,
    exp: number
}

@Controller('account')
export default class AccountController{
	constructor(
		private readonly AccountService: AccountService
	){}

	@Get('status')
    @UseGuards(JwtGuard)
    getUser(@Req() req: Request){
        const id = (req.user as IJwdPayloadUserId).id
        const userData = this.AccountService.getUser(id);
        return userData;
    }

    @Post('update')
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtGuard)
    getUpdate(@Req() req: Request, @Body() UpdateUserDto: UpdateUserDto){
        const id = (req.user as IJwdPayloadUserId).id
        return this.AccountService.updateUser(id, UpdateUserDto);
    }

    @Post('historyupdate')
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtGuard)
    getHistoryUpdate(@Req() req: Request, @Body() UserHistoryDto: UserHistoryDto){
        const id = (req.user as IJwdPayloadUserId).id
        return this.AccountService.updateUseHistory(id, UserHistoryDto);
    }

    @Post('pointadd')
    @UseGuards(JwtGuard)
    @UsePipes(new ValidationPipe())
    addUserPoint(@Req() req: Request, @Body() UserPointUpdateDto: UserPointUpdateDto){
        const id = (req.user as IJwdPayloadUserId).id
        return this.AccountService.addUserPoint(id, UserPointUpdateDto);
    }
}