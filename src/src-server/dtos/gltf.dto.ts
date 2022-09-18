import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsMobilePhone,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
  Equals,
  NotEquals,
  IsEmpty,
  IsNotIn,
  IsBooleanString,
  IsNumberString,
  IsMimeType,
  IsBoolean,
  IsArray,
  IsObject,
} from "class-validator";
import { IsFiles } from "../helpers/classValidator";

export class ReqGltfFileUpload {
  @IsNotEmpty()
  @IsFiles({
    mime: ["model/gltf+json", "model/gltf-binary", "application/octet-stream"],
  })
  files: File[];

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class ReqTest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
