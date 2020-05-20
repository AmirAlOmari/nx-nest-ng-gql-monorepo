import { Injectable, Inject } from '@nestjs/common';
import { JwtService as NestJwtService, JwtModuleOptions } from '@nestjs/jwt';

import { JWT_OPTIONS } from '../../tokens/jwt-options/jwt-options.token';

@Injectable()
export class JwtService extends NestJwtService {
  constructor(@Inject(JWT_OPTIONS) public jwtOptions: JwtModuleOptions) {
    super(jwtOptions);
  }
}
