import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";


enum Roles {
    "user" = "user",
    "admin" = "admin",
    "superadmin" = "superadmin"
}

enum Status {
    Active = "active",
    InActive = "inctive",
}


export class UpdateUserDto {

    @IsString()
    @IsOptional()
    fullname: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    avatarUrl: string;

}
