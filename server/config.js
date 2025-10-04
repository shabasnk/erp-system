const getSanitizedConfig = (config) => {
  // Only require JWT_SECRET for now
  if (!config.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment variables');
  }
  
  // If no database URL, use a dummy one and continue
  if (!config.PG_URI) {
    console.log('Warning: No database connection string found. Using dummy connection.');
    config.PG_URI = "postgresql://dummy:dummy@localhost:5432/dummy";
  }
  
  return config;
};