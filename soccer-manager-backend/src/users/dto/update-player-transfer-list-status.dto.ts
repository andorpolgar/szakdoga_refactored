import { IsBoolean } from 'class-validator';

export class UpdatePlayerTransferListStatusDto {
  @IsBoolean()
  isTransferListed: boolean;
}