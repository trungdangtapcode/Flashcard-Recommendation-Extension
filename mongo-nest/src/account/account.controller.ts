import {Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';

import { JwtGuard } from "@/auth/guards/jwt.guard";
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserHistoryDto } from './dto/UserHistory.dto';
import { UserPointUpdateDto } from './dto/UserPointUpdate.dto';
import { Request } from 'express';
import AccountService from './account.service';
import { DeckDto } from './dto/Deck.dto';
import { FlashcardDto } from './dto/Flashcard.dto';
import { AddFlashcardDto } from './dto/AddFlashCard.dto';

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

	@Post('createDeck')
	@UseGuards(JwtGuard)
	@UsePipes(new ValidationPipe())
	createDeck(@Req() req: Request, @Body() DeckDto: DeckDto){
		const id = (req.user as IJwdPayloadUserId).id
		return this.AccountService.addUserDeck(id, DeckDto);
	}
	@Post('addFlashcard')
	@UseGuards(JwtGuard)
	@UsePipes(new ValidationPipe())
	addFlashcard(@Req() req: Request, @Body() AddFlashcardDto: AddFlashcardDto){
		const id = (req.user as IJwdPayloadUserId).id
		const flashcard: FlashcardDto = AddFlashcardDto.flashcard;
		const deckId: string = AddFlashcardDto.deckId;
		return this.AccountService.addUserDeckCard(id, deckId, flashcard);
	}
	@Post('setDecks')
	@UseGuards(JwtGuard)
	@UsePipes(new ValidationPipe())
	setDecks(@Req() req: Request, @Body() DeckDto: DeckDto[]){
		const id = (req.user as IJwdPayloadUserId).id
		return this.AccountService.setUserDecks(id, DeckDto);
	}
	@Post('setDeck')
	@UseGuards(JwtGuard)
	@UsePipes(new ValidationPipe())
	setDeck(@Req() req: Request, @Body() DeckDto: DeckDto){
		const id = (req.user as IJwdPayloadUserId).id
		return this.AccountService.setUserDeck(id, DeckDto);
	}
}