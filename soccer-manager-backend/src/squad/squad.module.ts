import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SquadController } from './squad.controller';
import { SquadService } from './squad.service';

@Module({
  imports: [UsersModule],
  controllers: [SquadController],
  providers: [SquadService],
  exports: [SquadService],
})
export class SquadModule {}