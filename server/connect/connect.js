// import { Sequelize } from 'sequelize';
// import { sanitizedConfig } from '../config.js';

// // DEBUG: Log the database config
// console.log('=== DATABASE CONNECTION DEBUG ===');
// console.log('Database URL exists:', !!sanitizedConfig.DATABASE_URL);
// console.log('Using database:', sanitizedConfig.DATABASE_URL ? '***HIDDEN***' : 'MISSING');

// const sequelize = new Sequelize(sanitizedConfig.DATABASE_URL, {  // ← CHANGE THIS LINE
//   dialect: 'postgres',
//   logging: false, // Disable SQL log in production
//   dialectOptions: {
//     ssl: process.env.NODE_ENV === 'production' ? {
//       require: true,
//       rejectUnauthorized: false
//     } : false
//   }
// });

// export default sequelize;






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