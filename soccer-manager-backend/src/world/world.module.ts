import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { WorldController } from './world.controller';
import { WorldService } from './world.service';

@Module({
  imports: [UsersModule],
  controllers: [WorldController],
  providers: [WorldService],
  exports: [WorldService],
})
export class WorldModule {}