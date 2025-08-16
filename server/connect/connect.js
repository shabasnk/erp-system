// config/database.js
import { Sequelize } from 'sequelize';
import sanitizedConfig from '../config.js';

// Connect to the PostgreSQL database
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',  
  username: sanitizedConfig.DB_USERNAME, // Database username
  password: sanitizedConfig.DB_PASS, // Database password
  database: sanitizedConfig.DB_NAME,     // Database name
});

export default sequelize;

