import { IsNumber, IsString, IsUrl } from "class-validator";

export class CreateDocumentDto {

  @IsNumber()
  type?: number;

  @IsString()
  name: string;

  @IsUrl()
  url?: string;
}