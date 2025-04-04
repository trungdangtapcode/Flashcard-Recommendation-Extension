import { Injectable } from "@nestjs/common";
import { TranslateDto } from "./dto/translate.dto";
import {translate} from "google-translate-api-x";


@Injectable()
export class TranslateService {
	async translate(translateDto: TranslateDto){
		const res = await translate(translateDto.text, 
			{ from: translateDto.from, to: translateDto.to, autoCorrect: true });
		return {
			"text": res.text,
			"autocorrect": res.from.text.autoCorrected? res.from.text.value : translateDto.text,
		}
	}
}