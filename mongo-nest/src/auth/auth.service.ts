import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.chema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/CreateUser.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) 
            private userModel: Model<User>
    ) {}
    
    createUser(createUserDto: CreateUserDto) {
        const user = new this.userModel(createUserDto);
        return user.save();
    }
}