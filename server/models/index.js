import sequelize from "../connect/connect.js";

import Shops from "./shopModel.js";

// === Associations ===

// Category ↔ Products

// Export all models + sequelize instance
export { sequelize, Shops };

