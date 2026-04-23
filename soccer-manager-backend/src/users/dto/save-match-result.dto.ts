import { IsInt, Max, Min } from 'class-validator';

export class SaveMatchResultDto {
  @IsInt()
  @Min(0)
  @Max(20)
  homeGoals: number;

  @IsInt()
  @Min(0)
  @Max(20)
  awayGoals: number;
}