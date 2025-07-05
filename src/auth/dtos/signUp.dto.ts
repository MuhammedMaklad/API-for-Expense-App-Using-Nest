import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"
import { Exclude } from "class-transformer";
export class signUpDto {

  constructor(partial: Partial<signUpDto>) {
    Object.assign(this, partial)
  }

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
  password: string;

  @IsEmail()
  @IsString()
  email: string;
}

