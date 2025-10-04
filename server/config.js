import dotenv from "dotenv";
dotenv.config();

const getConfig = () => {
  // TEMPORARY HARDCODE - Replace with your actual DATABASE_URL
  const databaseUrl = "postgresql://postgres:IBUHnKLlUscpHtIkdrPjwCEreSoWxfAW@postgres-_11f.railway.internal:5432/railway";
  
  return {
    NODE_ENV: "production",
    PORT: process.env.PORT || 8080,
    DATABASE_URL: databaseUrl,
    JWT_SECRET: "wez_erp_super_secure_2025_8281@!",
  };
};

const getSanitizedConfig = (config) => {
  console.log('Using database:', config.DATABASE_URL ? '***HIDDEN***' : 'MISSING');
  return config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export { sanitizedConfig };

