import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsPhoneNumber, IsString } from "class-validator"

export class CreateCustomerDto {
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
