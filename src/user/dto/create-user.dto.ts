import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(["Intern", "admin" , 'user'],{
        message: "Valid role required",
        
    })
    role: "Intern" | "admin" | 'user'
}
