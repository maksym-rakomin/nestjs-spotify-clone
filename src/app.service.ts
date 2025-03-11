import { Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(private readonly devConfigService: DevConfigService) {}

  getHello(): string {
    return `Hello I am learning nestjs ${this.devConfigService.getDBHOST()}`;
  }
}
