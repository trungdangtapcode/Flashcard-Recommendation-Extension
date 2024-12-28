import { Injectable } from "@nestjs/common";
import { QuestionQueryDto } from './dto/QuestionQuery.dto';
import { AuthService } from '../auth/auth.service';
import mongoose from "mongoose";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";


@Injectable()
export class QueryService {
	constructor(
		private readonly AuthService:AuthService,
		private readonly HttpService: HttpService
	) {}

	async queryQuestion(id: string, QuestionQueryDto: QuestionQueryDto){
		const query: any = {_id: await new mongoose.Types.ObjectId(id)}
		const user = await this.AuthService.userModel.findOne(query);
		if (!('historyUrls' in QuestionQueryDto)){
			const urls = ('historyUrls' in user?user.historyUrls:"https://stackoverflow.com/questions/17899750/how-can-i-generate-an-objectid-with-mongoose");
			(QuestionQueryDto as any).historyUrls = urls;
		}
		try {
			const url = 'https://a27c-34-151-122-255.ngrok-free.app/question'
			const response = await firstValueFrom(this.HttpService.post(url, QuestionQueryDto));
			return response.data;
		} catch (error) {
			throw new Error(`Failed to send POST request: ${error.message}`);
		}
		return "hi there";
	}
}