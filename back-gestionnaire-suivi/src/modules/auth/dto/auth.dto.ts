import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "src/modules/user/entities/role.enum";

export class AuthDto {

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  hashed_token: string;

  @IsOptional()
  roles: Role
}