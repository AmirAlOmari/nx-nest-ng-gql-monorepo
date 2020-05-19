import { IGlobalConfig } from '../global-config/global-config.interface';
import { IAppConfig } from '../app-config/app-config.interface';
import { IDBConfig } from '../db-config/db-config.interface';

export interface IConfig extends IGlobalConfig, IAppConfig, IDBConfig {}
