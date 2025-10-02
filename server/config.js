import dotenv from "dotenv";
dotenv.config();

const getConfig = () => {
  return {
    NODE_ENV: process.env.NODE_ENV || "production",
    PORT: process.env.PORT || 8080,
    // Railway provides DATABASE_URL - use that first
    PG_URI: process.env.DATABASE_URL || process.env.PG_URI,
    JWT_SECRET: process.env.JWT_SECRET || "fallback-secret-for-production",
  };
};

const getSanitizedConfig = (config) => {
  // Only require JWT_SECRET and database connection
  if (!config.PG_URI) {
    throw new Error('Missing database connection string');
  }
  if (!config.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment variables');
  }
  return config;
};