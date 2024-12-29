import { IsDate, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";


export class UserPointUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1)
  point: number;
  
  @IsOptional()
  @IsDate()
  time: number;
  
  @IsNotEmpty()
  @IsNumber()
  word_id: number;
}