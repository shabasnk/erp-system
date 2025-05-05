import sequelize from "../connect/connect.js";

import Shops from "./shopModel.js";

// === Associations ===

// Category ↔ Product

// Export all models + sequelize instance
export { sequelize, Shops };
