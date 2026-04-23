import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class MatchService {
  constructor(private readonly usersService: UsersService) {}

  async saveMatchResult(saveId: string, fixtureId: string, homeGoals: number, awayGoals: number) {
    return this.usersService.saveMatchResult(saveId, fixtureId, homeGoals, awayGoals);
  }

  async playRound(saveId: string) {
    return this.usersService.playRound(saveId);
  }

  async playSelectedTeamNextMatch(saveId: string, homeGoals: number, awayGoals: number) {
    return this.usersService.playSelectedTeamNextMatch(saveId, homeGoals, awayGoals);
  }

  async simulateRemainingFixturesInCurrentRound(saveId: string) {
    return this.usersService.simulateRemainingFixturesInCurrentRound(saveId);
  }

  async completeCurrentRound(saveId: string) {
    return this.usersService.completeCurrentRound(saveId);
  }

  async playSingleMatch(saveId: string, fixtureId: string) {
    return this.usersService.playSingleMatch(saveId, fixtureId);
  }

  async getCurrentRoundMyMatchResult(saveId: string) {
    return this.usersService.getCurrentRoundMyMatchResult(saveId);
  }

  async getCurrentRoundOtherResults(saveId: string) {
    return this.usersService.getCurrentRoundOtherResults(saveId);
  }

  async getCurrentRoundActionSummary(saveId: string) {
    return this.usersService.getCurrentRoundActionSummary(saveId);
  }

  async getCurrentRoundStatus(saveId: string) {
    return this.usersService.getCurrentRoundStatus(saveId);
  }
}