import { IsOptional, IsString } from "class-validator";

export class CreateQuizzDto {

  @IsOptional()
  @IsString()
  name: string;

  is_completed?: boolean;
}