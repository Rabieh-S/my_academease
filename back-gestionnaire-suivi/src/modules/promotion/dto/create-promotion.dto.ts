import { IsString } from "class-validator";

export class CreatePromotionDto {

  @IsString()
  name: string;

  expiration?: Date;

}