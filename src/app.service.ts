import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `VERSION: ${process.env.npm_package_version}`;
  }
}
