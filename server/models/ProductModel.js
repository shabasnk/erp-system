// the successful add product model before adding status field for reportManagement.
// product.js
import { DataTypes } from 'sequelize';
import sequelize from '../connect/connect.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discountPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    stockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    serialNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true, // In kg
    },
    dimensions: {
        type: DataTypes.STRING,
        allowNull: true, // Format: LxWxH cm
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    unitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id',
        },
        onDelete: 'CASCADE',
    }
}, {
    tableName: 'products',
    timestamps: true,
});

export default Product;