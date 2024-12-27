import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto{
    @IsString()
    @IsEmail({}, {message: "Invalid email"})
    @IsNotEmpty()
    @MaxLength(30)
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    password: string;

    @IsOptional()
    @MaxLength(50)
    name: string; //Full name
}