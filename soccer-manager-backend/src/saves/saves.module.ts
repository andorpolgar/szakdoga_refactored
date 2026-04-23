import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SavesService } from './saves.service';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [SavesService],
  exports: [SavesService],
})
export class SavesModule {}