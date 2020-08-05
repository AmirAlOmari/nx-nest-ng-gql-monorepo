import { Provider } from '@nestjs/common';

import { ConfigService } from '../../../config/services/config/config.service';

import { JWT_OPTIONS } from '../../tokens/jwt-options/jwt-options.token';

export const jwtOptionsProvider: Provider = {
  provide: JWT_OPTIONS,
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: '24h' },
  }),
  inject: [ConfigService],
};
