import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.chema";
import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { LoginUserDto } from "./dto/LoginUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { JwtService } from "@nestjs/jwt"; // Add this line
import { UserHistoryDto } from "./dto/UserHistory.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) 
            public userModel: Model<User>,
            private jwtService: JwtService
    ) {}
    
    async createUser(createUserDto: CreateUserDto): Promise<{token: string}> {
        const user = new this.userModel(createUserDto);
        await user.save();
        const token = this.jwtService.sign({id: user._id});
        return {token};
    }

    async verifyUser(loginUserDto: LoginUserDto): Promise<{token: string}> {
        console.log('In Verify User (Service)');
        const user = await this.userModel.findOne(loginUserDto);
        if(user){
            const token = this.jwtService.sign({id: user._id});
            return {token};
        }
    }


    async getUser(id: string){
        const query: any = { _id: new mongoose.Types.ObjectId(id) }
        const user: any= await this.userModel.findOne(query);
        if (!('name' in user)) user.name = 'Anonymous';
        if (!('age' in user)) user.age = 18;
        if (!('occupation' in user)) user.occupation = 'Unemployed';
        if (!('hobbies' in user)) user.hobbies = 'Nothing';
        if (!('interests' in user)) user.interests = 'Nothing';
        if (!('gender' in user)) user.gender = 'Non-gendered';
        return user;
    }

    async updateUser(id: string, UpdateUserDto: UpdateUserDto){
        const query: any = { _id: new mongoose.Types.ObjectId(id) }
        const {name, bio} = UpdateUserDto;
        const update = {name, ...bio};
        const user = await this.userModel.findOneAndUpdate(query, update);
        return user
    }
    
    async updateUseHistory(id: string, UpdateUserDto: UserHistoryDto){
        const query: any = { _id: new mongoose.Types.ObjectId(id) }
        const {urls} = UpdateUserDto;
        const user = await this.userModel.findOneAndUpdate(query, {"historyUrls": urls});
        return user
    }
}