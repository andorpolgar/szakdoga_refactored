import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RenameSaveDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}