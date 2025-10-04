// import dotenv from "dotenv";
// dotenv.config();

// const getConfig = () => {
//   return {
//     NODE_ENV: process.env.NODE_ENV || "production",
//     PORT: process.env.PORT || 8080,
//     PG_URI: process.env.DATABASE_URL || process.env.PG_URI,
//     JWT_SECRET: process.env.JWT_SECRET || "fallback-secret-for-production",
//   };
// };

// const getSanitizedConfig = (config) => {
//   // Only require JWT_SECRET for now
//   if (!config.JWT_SECRET) {
//     throw new Error('Missing JWT_SECRET in environment variables');
//   }
  
//   // If no database URL, use a dummy one and continue
//   if (!config.PG_URI) {
//     console.log('Warning: No database connection string found. Using dummy connection.');
//     config.PG_URI = "postgresql://dummy:dummy@localhost:5432/dummy";
//   }
  
//   return config;
// };

// // ✅ MUST HAVE THESE LINES:
// const config = getConfig();
// const sanitizedConfig = getSanitizedConfig(config);

// // ✅ MUST HAVE THIS EXPORT:
// export { sanitizedConfig };




import dotenv from "dotenv";
dotenv.config();

const getConfig = () => {
  // DEBUG: Log what we're getting
  console.log('=== CONFIG DEBUG ===');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'EXISTS' : 'MISSING');
  console.log('PG_URI:', process.env.PG_URI ? 'EXISTS' : 'MISSING');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'EXISTS' : 'MISSING');
  
  // Use DATABASE_URL first, then PG_URI, otherwise null
  const databaseUrl = process.env.DATABASE_URL || process.env.PG_URI || null;
  
  return {
    NODE_ENV: process.env.NODE_ENV || "production",
    PORT: process.env.PORT || 8080,
    DATABASE_URL: databaseUrl, // Use consistent naming
    JWT_SECRET: process.env.JWT_SECRET || "fallback-secret-for-production",
  };
};

const getSanitizedConfig = (config) => {
  // Only require JWT_SECRET for now
  if (!config.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment variables');
  }
  
  // If no database URL, use a dummy one and continue
  if (!config.DATABASE_URL) {
    console.log('Warning: No database connection string found. Using dummy connection.');
    config.DATABASE_URL = "postgresql://dummy:dummy@localhost:5432/dummy";
  } else {
    console.log('Database connection string found:', config.DATABASE_URL ? '***HIDDEN***' : 'MISSING');
  }
  
  return config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export { sanitizedConfig };