import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class GameService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async playRoundForAuthenticatedUser(userId: string, saveId: string) {
    const save = await this.prisma.gameSave.findFirst({
      where: {
        id: saveId,
        userId,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        currentRound: true,
      },
    });

    if (!save) {
      throw new BadRequestException('Game save not found for this user');
    }

    const result = await this.usersService.playRound(saveId);

    return {
      message: 'Round played successfully',
      save: {
        id: save.id,
        name: save.name,
      },
      result,
    };
  }

  async getStateForAuthenticatedUser(userId: string, saveId: string) {
    const save = await this.prisma.gameSave.findFirst({
      where: {
        id: saveId,
        userId,
      },
      select: {
        id: true,
        name: true,
        currentRound: true,
        selectedTeamId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!save) {
      throw new BadRequestException('Game save not found for this user');
    }

    const [
      seasonState,
      clubSnapshot,
      actionSummary,
      myMatch,
      otherResults,
      standings,
    ] = await Promise.all([
      this.usersService.getSeasonState(saveId),
      this.usersService.getSelectedTeamClubSnapshot(saveId),
      this.usersService.getCurrentRoundActionSummary(saveId),
      this.usersService.getCurrentRoundMyMatchResult(saveId).catch(() => null),
      this.usersService.getCurrentRoundOtherResults(saveId).catch(() => null),
      this.usersService.getSaveStandings(saveId),
    ]);

    return {
      save: {
        id: save.id,
        name: save.name,
        currentRound: save.currentRound,
        createdAt: save.createdAt,
        updatedAt: save.updatedAt,
      },
      seasonState,
      club: clubSnapshot,
      round: {
        summary: actionSummary,
        myMatch,
        otherMatches: otherResults,
      },
      standings: {
        table: standings,
        topFive: standings.slice(0, 5),
      },
    };
  }

  async getCurrentRoundStatusForAuthenticatedUser(userId: string, saveId: string) {
    await this.ensureOwnedSave(userId, saveId);
    return this.usersService.getCurrentRoundStatus(saveId);
  }

  async getCurrentRoundActionSummaryForAuthenticatedUser(userId: string, saveId: string) {
    await this.ensureOwnedSave(userId, saveId);
    return this.usersService.getCurrentRoundActionSummary(saveId);
  }

  async getCurrentRoundMyMatchResultForAuthenticatedUser(userId: string, saveId: string) {
    await this.ensureOwnedSave(userId, saveId);
    return this.usersService.getCurrentRoundMyMatchResult(saveId);
  }

  async getCurrentRoundOtherResultsForAuthenticatedUser(userId: string, saveId: string) {
    await this.ensureOwnedSave(userId, saveId);
    return this.usersService.getCurrentRoundOtherResults(saveId);
  }

  async getSeasonSummaryForAuthenticatedUser(userId: string, saveId: string) {
    await this.ensureOwnedSave(userId, saveId);
    return this.usersService.getSeasonSummary(saveId);
  }

  async getSeasonFinalTableForAuthenticatedUser(userId: string, saveId: string) {
    await this.ensureOwnedSave(userId, saveId);
    return this.usersService.getSeasonFinalTable(saveId);
  }

  async getSeasonChampionForAuthenticatedUser(userId: string, saveId: string) {
    await this.ensureOwnedSave(userId, saveId);
    return this.usersService.getSeasonChampion(saveId);
  }

  private async ensureOwnedSave(userId: string, saveId: string) {
    const save = await this.prisma.gameSave.findFirst({
      where: {
        id: saveId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!save) {
      throw new BadRequestException('Game save not found for this user');
    }

    return save;
  }
}