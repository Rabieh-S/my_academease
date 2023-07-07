import { IsJSON, IsString } from "class-validator";

export class CreateQuestionDto {

  @IsString()
  question: string;

  @IsJSON()
  response: string[];
}