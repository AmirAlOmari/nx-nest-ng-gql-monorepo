import { Provider } from '@nestjs/common';
import { ConfigService } from '../../services/config/config.service';

export const configServiceProvider: Provider = {
  provide: ConfigService,
  useFactory: async () => {
    const configService = new ConfigService();

    configService.init();

    return configService;
  }
};
