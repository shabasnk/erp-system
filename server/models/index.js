// import sequelize from "../connect/connect.js";

// import Shops from "./shopModel.js";

// // === Associations ===

// // Category ↔ Products

// // Export all models + sequelize instance
// export { sequelize, Shops };





import sequelize from "../connect/connect.js";
import Shops from "./shopModel.js";
import Customer from "./customerModel.js";
import Order from "./orderModel.js";
import Product from "./ProductModel.js";
import Invoice from "./invoiceModel.js"; // Add this if you're using Invoice model

// Initialize models
const models = {
  Shops,
  Customer,
  Order,
  Product,
  Invoice // Add this if needed
};


console.log('Available models:', Object.keys(models)); // Debug: see what's available


// Set up associations - do this after all models are imported
Object.keys(models).forEach(modelName => {
  if (models[modelName] && models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Test the database connection and sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Export all models + sequelize instance
export { 
  sequelize, 
  Shops, 
  Customer, 
  Order, 
  Product,
  Invoice // Add this if needed
};