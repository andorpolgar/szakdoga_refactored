import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class WorldService {
  constructor(private readonly usersService: UsersService) {}

  async seedTeams() {
    return this.usersService.seedBaseTeams();
  }

  async seedPlayers() {
    return this.usersService.seedBasePlayers();
  }

  async seedLeague() {
    return this.usersService.seedBaseLeague();
  }

  async seedFixtureTemplates() {
    return this.usersService.seedBaseFixtureTemplates();
  }

  async resetDemoWorld() {
    return this.usersService.resetDemoWorld();
  }

  async bootstrapDemoWorld() {
    return this.usersService.bootstrapDemoWorld();
  }
}