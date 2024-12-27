import { Body, Controller, Get, UsePipes, ValidationPipe } from "@nestjs/common";
import { TranslateDto } from "./dto/translate.dto";
import { TranslateService } from "./translate.service";

@Controller('translate')
export class TranslateController {
	constructor(private translateService: TranslateService) {}

	@Get()
	@UsePipes(new ValidationPipe())
	translate(@Body() translateDto: TranslateDto){
		return this.translateService.translate(translateDto);
	}
}