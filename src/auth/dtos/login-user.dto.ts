import { 
    IsEmail, 
    MaxLength,
    IsString,
    Length,
    Matches
} from "class-validator";


export class loginUserDto {

    @IsEmail()
    @MaxLength(254)
    email: string;

    @IsString()
    @Length(8,32)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,32}$/, {
        message: "Password must contain at least one letter and one number",
    })
    password: string;

}