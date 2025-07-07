import { 
    IsEmail, 
    IsOptional,
    MaxLength,
    Length,
    IsString,
    IsPhoneNumber
} from "class-validator";


export class UpdateUserDto {

    @IsOptional()
    @IsEmail()
    @MaxLength(254)
    email:string;

    @IsOptional()
    @IsString()
    @Length(3,20)
    username: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    firstName?: string | null

    @IsOptional()
    @IsString()
    @MaxLength(60)
    lastName?: string | null

    @IsOptional()
    @IsPhoneNumber()
    @MaxLength(20)
    phone?: string | null
}