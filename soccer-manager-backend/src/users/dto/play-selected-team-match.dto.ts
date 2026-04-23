import { IsInt, Max, Min } from 'class-validator';

export class PlaySelectedTeamMatchDto {
  @IsInt()
  @Min(0)
  @Max(20)
  homeGoals: number;

  @IsInt()
  @Min(0)
  @Max(20)
  awayGoals: number;
}