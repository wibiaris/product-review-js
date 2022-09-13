import { ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable,UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { Strategy } from "passport-local";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService:UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWTKey,
        });
    }

    async validate(payload: any){
        const user = await this.userService.findOneById(payload.id);
        if(!user){
            throw new UnauthorizedException('You are not ahtoriezed to perform the operation')
        } 
        return payload;
    }
}