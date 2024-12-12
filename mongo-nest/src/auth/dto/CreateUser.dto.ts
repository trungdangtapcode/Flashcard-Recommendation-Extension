import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    password: string;
}