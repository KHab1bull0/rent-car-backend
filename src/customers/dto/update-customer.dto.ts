import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    @ApiProperty()
    @IsString()
    fullname: string

    @ApiProperty()
    @IsPhoneNumber()
    phone: string

    @ApiProperty()
    @IsEmail()
    email: string
}
