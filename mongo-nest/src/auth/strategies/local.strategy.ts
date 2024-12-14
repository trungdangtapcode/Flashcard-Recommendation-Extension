import {PassportStrategy} from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private AuthService: AuthService){
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string): Promise<any>{
        const user = this.AuthService.verifyUser({email, password});
        if (!user) throw new UnauthorizedException({message: "Wrong password or email"});
        return user;
    }
}