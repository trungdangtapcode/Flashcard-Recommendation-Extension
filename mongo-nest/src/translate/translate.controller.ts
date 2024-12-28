import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { TranslateDto } from "./dto/translate.dto";
import { TranslateService } from "./translate.service";

@Controller('translate')
export class TranslateController {
	constructor(private translateService: TranslateService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	async translate(@Body() translateDto: TranslateDto){
		const result = await this.translateService.translate(translateDto)
		return result;
	}
}