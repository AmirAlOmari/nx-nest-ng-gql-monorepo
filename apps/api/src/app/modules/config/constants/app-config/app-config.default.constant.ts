import { IAppConfig } from '../../interfaces/app-config/app-config.interface';

export const appConfigDefault: IAppConfig = {
  HOSTNAME: '127.0.0.1',
  PORT: 3001,
  HOSTNAME: '127.0.0.1',
  ACCESS_KEY: 'not-so-secret',
  MULTER_PATH: './data/upload',

  JWT_SECRET: 'not-so-secret', // 'e60fabc5',
};
