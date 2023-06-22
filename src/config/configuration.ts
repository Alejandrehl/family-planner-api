interface Configuration {
  database: Database;
  environment: string;
  jwtExpiresIn: string;
  jwtSecret: string;
  origin: string | string[];
  port: number;
}

interface Database {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  synchronize: boolean;
}

const configuration: Configuration = {
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    name: process.env.DATABASE_NAME || 'family_planner',
    synchronize: process.env.CURRENT_ENV !== 'production',
  },
  environment: process.env.CURRENT_ENV,
  jwtExpiresIn: process.env.JWT_EXPIRED_IN,
  jwtSecret: process.env.JWT_SECRET,
  origin: process.env.ORIGIN,
  port: parseInt(process.env.PORT, 10) || 3000,
};

export default configuration;
