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
    return '[{"question":"What your fucking","answers":["huh","the hell","stfu","kk"],"correct_id":2}]';
  }
}
