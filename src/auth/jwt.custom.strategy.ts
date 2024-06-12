import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt,Strategy } from "passport-jwt";
import { UserEntity } from "../user/user.entity";
import { Repository } from "typeorm";
import { UnauthorizedException } from "@nestjs/common";
//import { PassportStrategy } from "@nestjs/passport";


export class JwtCustomStrategy extends PassportStrategy(Strategy){

    constructor(@InjectRepository( UserEntity) private repo: Repository<UserEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'LOijtrkljdklsufidsui12jkj43k21l4'
        });
    }

    async validate(payload: { username: string}): Promise<UserEntity>{
        const { username } = payload;
        const user = await this.repo.findOneBy({username})
    

    if(!user){
        console.log('not success!')
        throw new UnauthorizedException();
    }
    console.log('success!')
    return user;
}
}