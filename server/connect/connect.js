import { Sequelize } from 'sequelize';
import { sanitizedConfig } from '../config.js';

const sequelize = new Sequelize(sanitizedConfig.PG_URI, {
  dialect: 'postgres',
  logging: false, // Disable SQL log in production
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

export default sequelize;