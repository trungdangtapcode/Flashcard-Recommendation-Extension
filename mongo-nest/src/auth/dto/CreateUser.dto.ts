import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}