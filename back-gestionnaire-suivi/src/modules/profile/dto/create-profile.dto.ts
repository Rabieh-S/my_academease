import { IsOptional, IsString, MaxLength } from "class-validator";
import { Status } from "../entities/status.enum";

export class CreateProfileDto {

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  phone?: string;

  @IsOptional()
  status?: Status;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  postal_code?: string;

  @IsOptional()
  @IsString()
  city?: string;

}