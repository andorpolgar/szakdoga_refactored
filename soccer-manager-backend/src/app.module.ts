import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { SavesModule } from './saves/saves.module';
import { MatchModule } from './match/match.module';
import { SquadModule } from './squad/squad.module';
import { TransferModule } from './transfer/transfer.module';
import { WorldModule } from './world/world.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SavesModule,
    UsersModule,
    GameModule,
    MatchModule,
    SquadModule,
    TransferModule,
    WorldModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}