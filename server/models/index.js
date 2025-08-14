// import sequelize from "../connect/connect.js";

// import Shops from "./shopModel.js";

// // === Associations ===

// // Category ↔ Products

// // Export all models + sequelize instance
// export { sequelize, Shops };






// after the association of order and customer tabel for reprtMngmnt.
// models/index.js
import sequelize from "../connect/connect.js";
import Shops from "./shopModel.js";
import Customer from "./customerModel.js";
import Order from "./orderModel.js";
import Product from "./ProductModel.js";

// Initialize models
const models = {
  Shops,
  Customer,
  Order,
  Product
  // Add other models here as needed
};

// Set up associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Test the database connection and sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: true }); // Use { force: true } only in development to drop and recreate tables
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Export all models + sequelize instance
export { sequelize, ...models };