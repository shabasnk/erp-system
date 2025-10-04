import { Sequelize } from 'sequelize';
import { sanitizedConfig } from '../config.js';

// DEBUG: Log the database config
console.log('=== DATABASE CONNECTION DEBUG ===');
console.log('Database URL exists:', !!sanitizedConfig.DATABASE_URL);
console.log('Using database:', sanitizedConfig.DATABASE_URL ? '***HIDDEN***' : 'MISSING');

const sequelize = new Sequelize(sanitizedConfig.DATABASE_URL, {  // ← CHANGE THIS LINE
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