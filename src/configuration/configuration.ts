import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface AppConfig {
  app: {
    env: string;
    port: number;
    logLevel: string;
  };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    useSSL: boolean;
  };
}

export const configuration = (): AppConfig => ({
  app: {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3000,
    logLevel: process.env.LOG_LEVEL || 'debug',
  },
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    useSSL: process.env.DB_SSL === 'true',
  },
});

export const typeOrmConfig = (): PostgresConnectionOptions => {
  const appConfig = configuration();
  const databaseConfig = appConfig.database;

  const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.database,
    entities: [__dirname + '/../**/*.entity.{js, ts}'],
    ssl: databaseConfig.useSSL && {
      rejectUnauthorized: true,
      ca: process.env.DB_SSL_CERT,
    },
    logging: appConfig.app.env === 'development',
  };
  return config;
};

export const pinoConfig = () => {
  const config = configuration();
  const pinoOptions = {
    level: config.app.logLevel,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        singleLine: true,
        ignore: 'pid,hostname',
      },
    },
    singleLine: true,
    redact: ['req.headers.authorization'],
    formatters: {
      level: (label: string) => {
        return { level: label };
      },
    },
  };

  return pinoOptions;
};
