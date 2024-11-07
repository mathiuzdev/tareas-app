import dotenv from 'dotenv';
import { Options } from 'sequelize';

dotenv.config();

interface Config {
  [key: string]: Options;
}

const config: Config = {
  development: {
    dialect: 'sqlite' as const, 
    storage: './database.db',
    logging: true,
    define: {
      timestamps: true,
      underscored: true,
    }
  },
  test: {
    dialect: 'sqlite' as const,
    storage: ':memory:',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    }
  },
  production: {
    dialect: 'sqlite' as const,
    storage: './database.db',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    }
  }
};

module.exports = config;