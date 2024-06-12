import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtCustomStrategy } from './jwt.custom.strategy';


@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
JwtModule.register({
  secret: 'LOijtrkljdklsufidsui12jkj43k21l4',
  signOptions: {
    
    expiresIn: 3600
  }
}
), PassportModule.register({
  defaultStrategy: 'jwt'
})],
  providers: [AuthService, JwtCustomStrategy],
  controllers: [AuthController],
  exports:[ PassportModule, JwtCustomStrategy],
})
export class AuthModule {}
