import { IsBoolean, IsString } from "class-validator";

export class CreateCenterDto {
  @IsString()
  name: string;

  @IsBoolean()
  is_remote?: boolean;

  @IsString()
  region?: string;
}