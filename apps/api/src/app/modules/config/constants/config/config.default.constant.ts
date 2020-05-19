import { IConfig } from '../../interfaces/config/config.interface';
import { globalConfigDefault } from '../global-config/global-config.default.constant';
import { appConfigDefault } from '../app-config/app-config.default.constant';
import { dbConfigDefault } from '../db-config/db-config.default.constant';

export const configDefault: IConfig = {
  ...globalConfigDefault,
  ...appConfigDefault,
  ...dbConfigDefault,
};
