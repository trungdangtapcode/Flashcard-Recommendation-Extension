import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { QuestionQueryDto } from './dto/QuestionQuery.dto';
import { AuthService } from '../auth/auth.service';
import mongoose from "mongoose";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import AccountService from '../account/account.service';


@Injectable()
export class QueryService {
	constructor(
		private readonly AuthService:AuthService,
		private readonly HttpService: HttpService,
		private readonly AccountService: AccountService
	) {}

	async queryQuestion(id: string, QuestionQueryDto: QuestionQueryDto){
		const query: any = {_id: await new mongoose.Types.ObjectId(id)}
		const user = await this.AuthService.userModel.findOne(query);
		console.log('before Dto: ',QuestionQueryDto);
		if (!('historyUrls' in QuestionQueryDto)){
			const urls = (user.hasOwnProperty('historyUrls')?user.historyUrls:["https://stackoverflow.com/questions/17899750/how-can-i-generate-an-objectid-with-mongoose"]);
			(QuestionQueryDto as any).historyUrls = urls;
		}
		if (QuestionQueryDto['historyUrls'].length > 10){
			(QuestionQueryDto as any).historyUrls = QuestionQueryDto['historyUrls'].slice(0, 10);
		}
		if (!('corpus' in QuestionQueryDto)){
			(QuestionQueryDto as any).corpus = "In this example, we walk through how you can combine retrieval results from multiple queries and multiple indexes. The retrieved nodes will be reranked according to the Reciprocal Rerank Fusion algorithm demonstrated in this paper. It provides an effecient method for rerranking retrieval results without excessive computation or reliance on external models.A dictionary dataset that reflects American English as it's used today. The machine-readable format of the New Oxford American Dictionary provides more than 350,000 words and meanings, curated and annotated by our expert lexicographers.";
		}
		if (!('bio' in QuestionQueryDto)){
			const bio = {}
			const user = await this.AuthService.userModel.findOne(query);
			(bio as any).gender = ('gender' in user&&user.gender!==undefined?user.gender:"Male");
			(bio as any).occupation = ('occupation' in user&&user.occupation!==undefined?user.occupation:"Programmer, deveploer, engineer");
			(bio as any).hobbies = ('hobbies' in user&&user.hobbies!==undefined?user.hobbies:"Coding, reading");
			(bio as any).interests = ('interests' in user&&user.interests!==undefined?user.interests:"News about technology, programming, and software development");
			(bio as any).age = ('age' in user&&user.age!==undefined?user.age:18);
			(QuestionQueryDto as any).bio = bio;
		}
		if (!('confScores' in QuestionQueryDto)){
			const confScores = await this.AccountService.getUserScores(id);
			(QuestionQueryDto as any).confScores = confScores;
		}
		console.log('after Dto: ',QuestionQueryDto);
		console.log(QuestionQueryDto.historyUrls.length);
		return '[{"word_id":156386,"question":"Industrial science; the science of systematic knowledge of the industrial arts  especially of the more important manufactures as spinning weaving metallurgy etc.","answers":["Resuming","Paint","Technology","Juvenal"],"correct_id":2},{"word_id":31294,"question":"A conceptualist.","answers":["Feme","Conceptionalist","Mannish","Human"],"correct_id":1}]'
		try {
			// const url = process.env.FASTAPI_URL + '/question';
			const url = "https://8510-34-82-193-114.ngrok-free.app/question";
			console.log('url: ',url);
			const response = await firstValueFrom(this.HttpService.post(url, QuestionQueryDto));
			return response.data;
		} catch (error) {
			throw new Error(`Failed to send POST request: ${error.message}`);
			throw new HttpException(`Forbidden because Python server down ${error}`, HttpStatus.FORBIDDEN);
		}
		return "hi there";
	}

	async queryQuestionDatabase(id: string){
		const decks = await this.AccountService.getUserDecks(id);
		const words = decks.flatMap((deck: any, deck_index: number) => deck.cards?deck.cards.map((card, index)=>{
			card.word_id = -(10**6 * deck_index + index) - 2705;
			return card;
		}):[]);
		const k = Math.min(10, words.length);
		if (k<4){
			return [false, []];
		}
		const sortedWords = words.sort((word1, word2) => word1.confidence-word2.confidence).slice(0, k);
		const randomQuestion = sortedWords.map((word: any) => {
			const {answer, ...rest} = word;
			const correctAnswer = answer;
			const answers = [correctAnswer, 
				...words.filter((w: any) => w.word_id!==word.word_id).slice(0, 3).map((w: any) => w.answer)].sort(() => Math.random() - Math.random());
			return {...rest, answers, correct_id: answers.indexOf(correctAnswer)};
		});
		return [true, randomQuestion];
	}
}