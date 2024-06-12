import { Controller, Post, Body} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '@nestjs/common';
import { UserLoginDto } from './dto/userLogin.dto';

@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService){}

@Post('register')
registration(@Body(ValidationPipe) regDTO: RegisterUserDto){
    return this.authService.registerUser(regDTO);
}

@Post('login')
 signIn(@Body(ValidationPipe) loginDTO: UserLoginDto){
        return this.authService.loginUser(loginDTO);
 }
}
