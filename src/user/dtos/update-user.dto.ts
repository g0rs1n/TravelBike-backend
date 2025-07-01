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
    @Length(1,50)
    firstName?: string | null

    @IsOptional()
    @IsString()
    @Length(1,60)
    lastName?: string | null

    @IsOptional()
    @IsPhoneNumber()
    @MaxLength(20)
    phone?: string | null
}