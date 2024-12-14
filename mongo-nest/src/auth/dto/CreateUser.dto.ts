import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto{
    @IsString()
    @IsEmail({}, {message: "Invalid email"})
    @IsNotEmpty()
    @MaxLength(30)
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    password: string;
}