import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.chema";
import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { LoginUserDto } from "./dto/LoginUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { JwtService } from "@nestjs/jwt"; // Add this line
import { UserHistoryDto } from "./dto/UserHistory.dto";
import { UserPointUpdateDto } from "./dto/UserPointUpdate.dto";

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

    async addUserPoint(id: string, data: UserPointUpdateDto): Promise<void> {
        const user = await this.userModel.findById({_id: new mongoose.Types.ObjectId(id) });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        if (!('time' in data)) (data as any).time = Math.floor(Date.now() / 1000);
    
        console.log('adding to ',id, ' data: ',data);
        const new_point = {
          word_id: data.word_id,
          time: data.time,
          point: data.point,
        }
        user.learningData.push(new_point);
        await user.save();
    }
    async getUserScores(_id: string): Promise<{ word_id: number; score: number }[]> {
        const user = await this.userModel.findById(_id);
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    
        const scores = user.learningData.reduce((acc, data) => {
          const timeDifference = currentTime - data.time;
          const contribution = data.point / timeDifference;
    
          if (!acc[data.word_id]) {
            acc[data.word_id] = 0;
          }
          acc[data.word_id] += contribution;
    
          return acc;
        }, {});
    
        return Object.entries(scores).map(([word_id, score]) => ({
          word_id: parseInt(word_id, 10),
          score: Number(score),
        }));
    }
}