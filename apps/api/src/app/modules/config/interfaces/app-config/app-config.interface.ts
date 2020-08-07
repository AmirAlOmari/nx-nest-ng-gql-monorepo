export interface IAppConfig {
  HOSTNAME: string;
  PORT: string | number;
  ACCESS_KEY: string;
  MULTER_PATH: string;

  JWT_SECRET: string;
}
