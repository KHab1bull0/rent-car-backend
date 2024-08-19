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


export class SignUpDto2 {

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsEnum(Status)
    @IsString()
    @IsOptional()
    status: string = Status.InActive
}
