// // models/product.js
// import { DataTypes } from "sequelize";
// import sequelize from "../connect/connect.js";

// const Product = sequelize.define(
//   "Product",
//   {
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     image: { type: DataTypes.STRING, allowNull: false },
//     name: { type: DataTypes.STRING, allowNull: false },
//     description: { type: DataTypes.TEXT, allowNull: true },

//     // CHANGED -> DECIMAL for money in rupees
//     price: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
//     discountPrice: { type: DataTypes.DECIMAL(14, 2), allowNull: true },

//     stockQuantity: { type: DataTypes.INTEGER, allowNull: false },
//     sku: { type: DataTypes.STRING, allowNull: true, unique: true },
//     serialNumber: { type: DataTypes.STRING, allowNull: true, unique: true },
//     barcode: { type: DataTypes.STRING, allowNull: true, unique: true },
//     brand: { type: DataTypes.STRING, allowNull: true },
//     weight: { type: DataTypes.FLOAT, allowNull: true }, // kg
//     dimensions: { type: DataTypes.STRING, allowNull: true }, // LxWxH
//     expirationDate: { type: DataTypes.DATE, allowNull: true },
//     tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
//     unitId: { type: DataTypes.INTEGER, allowNull: false },
//     isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
//     categoryId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       // references: { model: "categories", key: "id" },
//       // onDelete: "CASCADE",
//     },
//   },
//   {
//     tableName: "products",
//     timestamps: true,
//   }
// );

// export default Product;






















// fr shopowner bsed rprt
// models/product.js
import { DataTypes } from "sequelize";
import sequelize from "../connect/connect.js";

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    image: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },

    // CHANGED -> DECIMAL for money in rupees
    price: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
    discountPrice: { type: DataTypes.DECIMAL(14, 2), allowNull: true },

    stockQuantity: { type: DataTypes.INTEGER, allowNull: false },
    sku: { type: DataTypes.STRING, allowNull: true, unique: true },
    serialNumber: { type: DataTypes.STRING, allowNull: true, unique: true },
    barcode: { type: DataTypes.STRING, allowNull: true, unique: true },
    brand: { type: DataTypes.STRING, allowNull: true },
    weight: { type: DataTypes.FLOAT, allowNull: true }, // kg
    dimensions: { type: DataTypes.STRING, allowNull: true }, // LxWxH
    expirationDate: { type: DataTypes.DATE, allowNull: true },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    unitId: { type: DataTypes.INTEGER, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: { model: "categories", key: "id" },
      // onDelete: "CASCADE",
    },
    // ADD shopId field
    shopId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Shops", // Make sure this matches your Shop model's table name
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

export default Product;