import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdatePlayerLineupPositionDto {
  @IsOptional()
  @IsString()
  @IsIn(['GK', 'LB', 'CB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST'])
  lineupPosition?: string | null;
}