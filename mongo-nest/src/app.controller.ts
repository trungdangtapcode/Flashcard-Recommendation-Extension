import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('questions')
  getQuestions(): string {
    return '[{"word_id":156386,"question":"Industrial science; the science of systematic knowledge of the industrial arts  especially of the more important manufactures as spinning weaving metallurgy etc.","answers":["Resuming","Paint","Technology","Juvenal"],"correct_id":2},{"word_id":31294,"question":"A conceptualist.","answers":["Feme","Conceptionalist","Mannish","Human"],"correct_id":1}]'
    return '[{"question":"What your fucking","answers":["huh","the hell","stfu","kk"],"correct_id":2}]';
  }
}
