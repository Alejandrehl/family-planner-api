import configuration from 'src/config/configuration';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configuration.database.host,
        port: configuration.database.port,
        username: configuration.database.username,
        password: configuration.database.password,
        database: configuration.database.name,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configuration.database.synchronize,
      });

      return dataSource.initialize();
    },
  },
];
