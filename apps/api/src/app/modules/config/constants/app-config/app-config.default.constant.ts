import { IAppConfig } from '../../interfaces/app-config/app-config.interface';

export const appConfigDefault: IAppConfig = {
  PORT: 3001,
  ACCESS_KEY: 'not-so-secret',
  MULTER_PATH: './data/upload',

  JWT_SECRET: 'not-so-secret' // 'e60fabc5',
};
