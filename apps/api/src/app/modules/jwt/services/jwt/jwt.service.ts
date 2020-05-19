import { Injectable, Inject } from '@nestjs/common';
import { JwtService, JwtModuleOptions } from '@nestjs/jwt';

import { JWT_OPTIONS } from '../../tokens/jwt-options/jwt-options.token';

@Injectable()
export class CustomJwtService extends JwtService {
  constructor(@Inject(JWT_OPTIONS) public jwtOptions: JwtModuleOptions) {
    super(jwtOptions);
  }
}
