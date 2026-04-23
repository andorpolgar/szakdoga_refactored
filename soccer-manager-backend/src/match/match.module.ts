import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  imports: [UsersModule],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}