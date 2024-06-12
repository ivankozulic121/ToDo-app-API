import { IsNotEmpty, MinLength, MaxLength} from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    @MinLength(6) @MaxLength(12) //naknadno upisi za matchovanje patterna
    password: string
}