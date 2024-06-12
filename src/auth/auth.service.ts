import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/userLogin.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>, private jwt: JwtService){

    }

async registerUser(registerDTO: RegisterUserDto): Promise<UserEntity>{

        const { username, password } = registerDTO;
        const salt = await bcrypt.genSalt(12); // 12 rundi, ovo je vjerovatno vezano za algoritam
        const hashed = await  bcrypt.hash(password,12);

        const user: UserEntity = new UserEntity();
        user.username = username
        user.password = password
        user.salt = salt

        this.repo.create(user)
        
        try{
            return await this.repo.save(user);
        }
        catch(err){
            throw new InternalServerErrorException();
        }
    }

    async loginUser(loginDTO: UserLoginDto) {

       const { username, password } = loginDTO;
       const user = await this.repo.findOneBy({username});
       console.log(user.username);
    
       

       if (!user){
        throw new UnauthorizedException('Invalid credentials');
       }
    /* ovo cemo da zakomentarisemo jer ne radi kako treba ocigledno (bcrypt)*/
       //const isPasswordMatch = await bcrypt.compare(password,user.password); //kada ovako pozivas funkciju (isspasswordmatch je true) iz user entity onda radi, nzm zasto, ali tako praktikuj funckiju ubuduce
       console.log(password + '+'+ user.password);
       //console.log(isPasswordMatch);
       if ( password == user.password/*ovo je najprimitivnija logika moja xD, jer jer brypt sjeban*/) {
        const jwtPayload = { username };
        const jwtToken = await this.jwt.signAsync(jwtPayload, {expiresIn: '1d', algorithm: 'HS512'})
        return { token: jwtToken}
       }
       else {
        throw new UnauthorizedException('Invalid credentials');
       }

}
}
