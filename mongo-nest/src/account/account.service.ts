import { Injectable, NotFoundException } from "@nestjs/common";
import mongoose from "mongoose";
import { v4 as uuidv4} from 'uuid';

import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { UserHistoryDto } from "./dto/UserHistory.dto";
import { UserPointUpdateDto } from "./dto/UserPointUpdate.dto";
import { AuthService } from "@/auth/auth.service";
import { DeckDto } from "./dto/Deck.dto";
import { FlashcardDto } from "./dto/Flashcard.dto";

@Injectable()
class AccountService{
	constructor(
		private readonly AuthService: AuthService
	){}

	async getUser(id: string){
        const query: any = { _id: new mongoose.Types.ObjectId(id) }
        const user: any= await this.AuthService.userModel.findOne(query);
        if (!('name' in user)) user.name = 'Anonymous';
        if (!('age' in user)) user.age = 18;
        if (!('occupation' in user)) user.occupation = 'Unemployed';
        if (!('hobbies' in user)) user.hobbies = 'Nothing';
        if (!('interests' in user)) user.interests = 'Nothing';
        if (!('gender' in user)) user.gender = 'Non-gendered';
        return user;
    }

    async updateUser(id: string, UpdateUserDto: UpdateUserDto){
        const query: any = { _id: new mongoose.Types.ObjectId(id) }
        const {name, bio} = UpdateUserDto;
        const update = {name, ...bio};
        const user = await this.AuthService.userModel.findOneAndUpdate(query, update);
        return user
    }
    
    async updateUseHistory(id: string, UpdateUserDto: UserHistoryDto){
        const query: any = { _id: new mongoose.Types.ObjectId(id) }
        const {urls} = UpdateUserDto;
        const user = await this.AuthService.userModel.findOneAndUpdate(query, {"historyUrls": urls});
        return user
    }

    async addUserPoint(id: string, data: UserPointUpdateDto): Promise<void> {
        const user = await this.AuthService.userModel.findById({_id: new mongoose.Types.ObjectId(id) });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        if (!('time' in data)) (data as any).time = Math.floor(Date.now() / 1000);
    
        console.log('adding to ',id, ' data: ',data);
        const new_point = {
          word_id: data.word_id,
          time: data.time,
          point: data.point,
        }
        user.learningData.push(new_point);
        await user.save();
    }
    async getUserScores(_id: string): Promise<{ word_id: number; score: number }[]> {
        const user = await this.AuthService.userModel.findById(_id);
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    
        const scores = user.learningData.reduce((acc, data) => {
          const timeDifference = currentTime - data.time;
          const contribution = data.point / timeDifference;
    
          if (!acc[data.word_id]) {
            acc[data.word_id] = 0;
          }
          acc[data.word_id] += contribution;
    
          return acc;
        }, {});
    
        return Object.entries(scores).map(([word_id, score]) => ({
          word_id: parseInt(word_id, 10),
          score: Number(score),
        }));
    }
  	async addUserDeck(userId: string, deck: DeckDto){
		const user: any = await this.AuthService.userModel.findById(userId);
		console.log(user.decks)
		if (!user) {
			throw new NotFoundException('User not found');
		}
		deck.deckId = uuidv4();
		if ('decks' in user) user.decks.push(deck);
		else user.decks = [deck];
		await user.save();
  	}
	async addUserDeckCard(userId: string, deckId: string, card: FlashcardDto){
		const user: any = await this.AuthService.userModel.findById(userId);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		//first element satisfying the condition
		const deck = user.decks.find((deck: any) => deck.deckId === deckId);
		if (!deck) {
			throw new NotFoundException('Deck not found');
		}
		if (!('cards' in deck)) deck.cards = [];
		deck.cards.push(card);
		await user.save();
	}
	async getUserDecks(userId: string){
		const user: any = await this.AuthService.userModel.findById(userId);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user.decks;
	}
	async getUserDeck(userId: string, deckId: string){
		const user: any = await this.AuthService.userModel.findById(userId);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		const deck = user.decks.find((deck: any) => deck.deckId === deckId);
		if (!deck) {
			throw new NotFoundException('Deck not found');
		}
		return deck;
	}
	async setUserDeck(userId: string, deck: DeckDto){
		const user: any = await this.AuthService.userModel.findById(userId);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		const deckId = deck.deckId;
		const index = user.decks.findIndex((deck: any) => deck.deckId === deckId);
		if (index === -1) {
			throw new NotFoundException('Deck not found');
		}
		user.decks[index] = deck;
		await user.save();
	}
	async setUserDecks(userId: string, decks: DeckDto[]){
		const user: any = await this.AuthService.userModel.findById(userId);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		user.decks = decks;
		await user.save();
	}
}

export default AccountService;