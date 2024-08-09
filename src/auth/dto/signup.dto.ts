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


export class SignUpDto {

    @IsString()
    fullname: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    avatarUrl: string;

    @IsString()
    @IsEnum(Roles)
    @IsOptional()
    role: string

    @IsEnum(Status)
    @IsString()
    @IsOptional()
    status: string
}
