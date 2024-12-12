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
        try {
            const user = new this.userModel(createUserDto);
            user.save();
            return user;
        } catch (error) {
            if (error.code === 11000) {
                throw new Error("Email already exists");
            }
            throw new Error("An error occurred");
            return "error";
        }
    }

    getUser(){
        return this.userModel.find();
    }
}