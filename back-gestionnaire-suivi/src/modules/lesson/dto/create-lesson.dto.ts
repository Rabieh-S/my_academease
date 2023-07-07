import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateLessonDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  duration?: string;
}