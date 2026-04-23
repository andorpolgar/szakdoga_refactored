import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Post('me/saves/:saveId/play-round')
  async playRoundForAuthenticatedUser(
    @Request() req: { user: { id: string; email: string; username: string } },
    @Param('saveId') saveId: string,
  ) {
    return this.gameService.playRoundForAuthenticatedUser(req.user.id, saveId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/saves/:saveId/state')
  async getStateForAuthenticatedUser(
    @Request() req: { user: { id: string; email: string; username: string } },
    @Param('saveId') saveId: string,
  ) {
    return this.gameService.getStateForAuthenticatedUser(req.user.id, saveId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/saves/:saveId/current-round-status')
  async getCurrentRoundStatusForAuthenticatedUser(
    @Request() req: { user: { id: string; email: string; username: string } },
    @Param('saveId') saveId: string,
  ) {
    return this.gameService.getCurrentRoundStatusForAuthenticatedUser(
      req.user.id,
      saveId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/saves/:saveId/current-round/action-summary')
  async getCurrentRoundActionSummaryForAuthenticatedUser(
    @Request() req: { user: { id: string; email: string; username: string } },
    @Param('saveId') saveId: string,
  ) {
    return this.gameService.getCurrentRoundActionSummaryForAuthenticatedUser(
      req.user.id,
      saveId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/saves/:saveId/current-round/my-match-result')
  async getCurrentRoundMyMatchResultForAuthenticatedUser(
    @Request() req: { user: { id: string; email: string; username: string } },
    @Param('saveId') saveId: string,
  ) {
    return this.gameService.getCurrentRoundMyMatchResultForAuthenticatedUser(
      req.user.id,
      saveId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/saves/:saveId/current-round/other-results')
  async getCurrentRoundOtherResultsForAuthenticatedUser(
    @Request() req: { user: { id: string; email: string; username: string } },
    @Param('saveId') saveId: string,
  ) {
    return this.gameService.getCurrentRoundOtherResultsForAuthenticatedUser(
      req.user.id,
      saveId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/saves/:saveId/season/summary')
  async getSeasonSummaryForAuthenticatedUser(
    @Request() req: { user: { id: string; email: string; username: string } },
    @Param('saveId') saveId: string,
  ) {
    return this.gameService.getSeasonSummaryForAuthenticatedUser(
      req.user.id,
      saveId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/saves/:saveId/season/final-table')
  async getSeasonFinalTableForAuthenticatedUser(
    @Request() req: { user: { id: string; email: string; username: string } },
    @Param('saveId') saveId: string,
  ) {
    return this.gameService.getSeasonFinalTableForAuthenticatedUser(
      req.user.id,
      saveId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/saves/:saveId/season/champion')
  async getSeasonChampionForAuthenticatedUser(
    @Request() req: { user: { id: string; email: string; username: string } },
    @Param('saveId') saveId: string,
  ) {
    return this.gameService.getSeasonChampionForAuthenticatedUser(
      req.user.id,
      saveId,
    );
  }
}