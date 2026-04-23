import { Controller, Get, Param, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get('saves/:saveId/market/players')
  async getMarketPlayers(@Param('saveId') saveId: string) {
    return this.transferService.getMarketPlayers(saveId);
  }

  @Get('saves/:saveId/transfer-listed-players')
  async getTransferListedPlayers(@Param('saveId') saveId: string) {
    return this.transferService.getTransferListedPlayers(saveId);
  }

  @Get('saves/:saveId/selected-team/transfer-listed-players')
  async getSelectedTeamTransferListedPlayers(@Param('saveId') saveId: string) {
    return this.transferService.getSelectedTeamTransferListedPlayers(saveId);
  }

  @Post('saves/:saveId/market/players/:playerId/buy')
  async buyMarketPlayer(
    @Param('saveId') saveId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.transferService.buyMarketPlayer(saveId, playerId);
  }

  @Post('saves/:saveId/players/:playerId/list-for-transfer')
  async listPlayerForTransfer(
    @Param('saveId') saveId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.transferService.listPlayerForTransfer(saveId, playerId);
  }

  @Post('saves/:saveId/players/:playerId/remove-from-transfer-list')
  async removePlayerFromTransferList(
    @Param('saveId') saveId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.transferService.removePlayerFromTransferList(saveId, playerId);
  }

  @Post('saves/:saveId/selected-team/players/:playerId/list-for-transfer')
  async listSelectedTeamPlayerForTransfer(
    @Param('saveId') saveId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.transferService.listPlayerForTransfer(saveId, playerId);
  }

  @Post('saves/:saveId/selected-team/players/:playerId/remove-from-transfer-list')
  async removeSelectedTeamPlayerFromTransferList(
    @Param('saveId') saveId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.transferService.removePlayerFromTransferList(saveId, playerId);
  }

  @Get('saves/:saveId/transfers/history')
  async getTransferHistory(@Param('saveId') saveId: string) {
    return this.transferService.getTransferHistory(saveId);
  }
}