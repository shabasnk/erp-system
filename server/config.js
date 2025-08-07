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







// // for green api second trial
// import dotenv from "dotenv";

// // Load environment variables from the .env file
// dotenv.config();

// const getConfig = () => {
//   return {
//     NODE_ENV: process.env.NODE_ENV,
//     PORT: process.env.PORT || '8080',  // Default port
//     PG_URI: process.env.PG_URI,
//     JWT_SECRET: process.env.JWT_SECRET,
//     // Make these optional if PG_URI is provided
//     DB_NAME: process.env.PG_URI ? undefined : process.env.DB_NAME,
//     DB_USERNAME: process.env.PG_URI ? undefined : process.env.DB_USERNAME,
//     DB_PASS: process.env.PG_URI ? undefined : process.env.DB_PASS,
//     GREEN_API_INSTANCE: process.env.GREEN_API_INSTANCE,
//     GREEN_API_TOKEN: process.env.GREEN_API_TOKEN,
//     GREEN_API_URL: process.env.GREEN_API_URL,
//     WA_DEFAULT_NUMBER: process.env.WA_DEFAULT_NUMBER
//   };
// };

// const getSanitizedConfig = (config) => {
//   const requiredKeys = ['NODE_ENV', 'JWT_SECRET'];
//   const dbKeys = config.PG_URI ? [] : ['DB_NAME', 'DB_USERNAME', 'DB_PASS'];
  
//   for (const key of [...requiredKeys, ...dbKeys]) {
//     if (config[key] === undefined) {
//       throw new Error(`Missing key ${key} in config.env`);
//     }
//   }
//   return config;
// };

// const config = getConfig();
// const sanitizedConfig = getSanitizedConfig(config);

// export default sanitizedConfig;
