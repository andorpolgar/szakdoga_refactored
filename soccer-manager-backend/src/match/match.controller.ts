import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import { SaveMatchResultDto } from '../users/dto/save-match-result.dto';
import { PlaySelectedTeamMatchDto } from '../users/dto/play-selected-team-match.dto';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('saves/:saveId/fixtures/:fixtureId/result')
  async saveMatchResult(
    @Param('saveId') saveId: string,
    @Param('fixtureId') fixtureId: string,
    @Body() body: SaveMatchResultDto,
  ) {
    return this.matchService.saveMatchResult(
      saveId,
      fixtureId,
      body.homeGoals,
      body.awayGoals,
    );
  }

  @Post('saves/:saveId/play-round')
  async playRound(@Param('saveId') saveId: string) {
    return this.matchService.playRound(saveId);
  }

  @Post('saves/:saveId/selected-team/play-next-match')
  async playSelectedTeamNextMatch(
    @Param('saveId') saveId: string,
    @Body() body: PlaySelectedTeamMatchDto,
  ) {
    return this.matchService.playSelectedTeamNextMatch(
      saveId,
      body.homeGoals,
      body.awayGoals,
    );
  }

  @Post('saves/:saveId/simulate-current-round')
  async simulateRemainingFixturesInCurrentRound(@Param('saveId') saveId: string) {
    return this.matchService.simulateRemainingFixturesInCurrentRound(saveId);
  }

  @Post('saves/:saveId/complete-current-round')
  async completeCurrentRound(@Param('saveId') saveId: string) {
    return this.matchService.completeCurrentRound(saveId);
  }

  @Post('saves/:saveId/matches/:fixtureId/play')
  async playSingleMatch(
    @Param('saveId') saveId: string,
    @Param('fixtureId') fixtureId: string,
  ) {
    return this.matchService.playSingleMatch(saveId, fixtureId);
  }

  @Get('saves/:saveId/current-round-status')
  async getCurrentRoundStatus(@Param('saveId') saveId: string) {
    return this.matchService.getCurrentRoundStatus(saveId);
  }

  @Get('saves/:saveId/current-round/my-match-result')
  async getCurrentRoundMyMatchResult(@Param('saveId') saveId: string) {
    return this.matchService.getCurrentRoundMyMatchResult(saveId);
  }

  @Get('saves/:saveId/current-round/other-results')
  async getCurrentRoundOtherResults(@Param('saveId') saveId: string) {
    return this.matchService.getCurrentRoundOtherResults(saveId);
  }

  @Get('saves/:saveId/current-round/action-summary')
  async getCurrentRoundActionSummary(@Param('saveId') saveId: string) {
    return this.matchService.getCurrentRoundActionSummary(saveId);
  }
}