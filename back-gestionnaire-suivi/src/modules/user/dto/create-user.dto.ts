import { IsEmail, IsOptional, IsString } from "class-validator";
import { Role } from "../entities/role.enum";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  hashed_token: string;

  @IsOptional()
  roles?: Role;
}