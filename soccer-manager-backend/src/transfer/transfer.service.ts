import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransferService {
  constructor(private readonly usersService: UsersService) {}

  async getMarketPlayers(saveId: string) {
    return this.usersService.getMarketPlayers(saveId);
  }

  async getTransferListedPlayers(saveId: string) {
    return this.usersService.getTransferListedPlayers(saveId);
  }

  async getSelectedTeamTransferListedPlayers(saveId: string) {
    return this.usersService.getSelectedTeamTransferListedPlayers(saveId);
  }

  async buyMarketPlayer(saveId: string, playerId: string) {
    return this.usersService.buyMarketPlayer(saveId, playerId);
  }

  async listPlayerForTransfer(saveId: string, playerId: string) {
    return this.usersService.listAnySavePlayerForTransfer(saveId, playerId);
  }

  async removePlayerFromTransferList(saveId: string, playerId: string) {
    return this.usersService.removeAnySavePlayerFromTransferList(saveId, playerId);
  }

  async listSelectedTeamPlayerForTransfer(saveId: string, playerId: string) {
    return this.usersService.listSelectedTeamPlayerForTransfer(saveId, playerId);
  }

  async removeSelectedTeamPlayerFromTransferList(saveId: string, playerId: string) {
    return this.usersService.removeSelectedTeamPlayerFromTransferList(saveId, playerId);
  }

  async getTransferHistory(saveId: string) {
    return this.usersService.getTransferHistory(saveId);
  }
}