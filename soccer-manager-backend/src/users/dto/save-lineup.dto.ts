import {
  ArrayUnique,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SaveLineupStarterDto {
  @IsString()
  @IsNotEmpty()
  playerId: string;

  @IsString()
  @IsNotEmpty()
  lineupSlot: string;
}

export class SaveLineupDto {
  @IsString()
  @IsIn(['4-3-3', '4-2-3-1', '4-4-2', '4-1-2-1-2', '3-5-2'])
  formation: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveLineupStarterDto)
  starters: SaveLineupStarterDto[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  benchPlayerIds?: string[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  reservePlayerIds?: string[];
}