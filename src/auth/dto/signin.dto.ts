
import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './signup.dto';
import { IsEmail, IsString } from 'class-validator';

export class SigninDto {

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string
}
