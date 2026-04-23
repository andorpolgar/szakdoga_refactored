import { Controller, Post } from '@nestjs/common';
import { WorldService } from './world.service';

@Controller('world')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Post('seed/teams')
  async seedTeams() {
    return this.worldService.seedTeams();
  }

  @Post('seed/players')
  async seedPlayers() {
    return this.worldService.seedPlayers();
  }

  @Post('seed/league')
  async seedLeague() {
    return this.worldService.seedLeague();
  }

  @Post('seed/fixture-templates')
  async seedFixtureTemplates() {
    return this.worldService.seedFixtureTemplates();
  }

  @Post('seed/reset-demo-world')
  async resetDemoWorld() {
    return this.worldService.resetDemoWorld();
  }

  @Post('seed/bootstrap-demo-world')
  async bootstrapDemoWorld() {
    return this.worldService.bootstrapDemoWorld();
  }
}