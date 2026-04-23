import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}