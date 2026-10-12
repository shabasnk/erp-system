// import dotenv from "dotenv";
// dotenv.config();

// const getConfig = () => {
//   // TEMPORARY HARDCODE - Replace with your actual DATABASE_URL
//   const databaseUrl = "postgresql://postgres:IBUHnKLlUscpHtIkdrPjwCEreSoWxfAW@postgres-_11f.railway.internal:5432/railway";
  
//   return {
//     NODE_ENV: "production",
//     PORT: process.env.PORT || 8080,
//     DATABASE_URL: databaseUrl,
//     JWT_SECRET: "wez_erp_super_secure_2025_8281@!",
//   };
// };

// const getSanitizedConfig = (config) => {
//   console.log('Using database:', config.DATABASE_URL ? '***HIDDEN***' : 'MISSING');
//   return config;
// };

// const config = getConfig();
// const sanitizedConfig = getSanitizedConfig(config);

// export { sanitizedConfig };











import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

const getConfig = () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? process.env.PORT : undefined,
    PG_URI: process.env.PG_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASS: process.env.DB_PASS,
    // AWS_ACCESS: process.env.AWS_ACCESS,
    // AWS_SECRETACCESS: process.env.AWS_SECRETACCESS,
    // S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  };
};

const getSanitizedConfig = (config) => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);


export default sanitizedConfig;