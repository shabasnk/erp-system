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











// // product Model after adding status field for report management stock status.
// import { DataTypes } from 'sequelize';
// import sequelize from '../connect/connect.js';

// const Product = sequelize.define('Product', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     image: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//     },
//     price: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     discountPrice: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     stockQuantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     status: {
//         type: DataTypes.ENUM('In Stock', 'Low Stock', 'Out of Stock'),
//         defaultValue: 'In Stock',
//         allowNull: false
//     },
//     lowStockThreshold: {
//         type: DataTypes.INTEGER,
//         defaultValue: 10,
//         allowNull: false
//     },
//     sku: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         unique: true,
//     },
//     serialNumber: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         unique: true,
//     },
//     barcode: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         unique: true,
//     },
//     brand: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     weight: {
//         type: DataTypes.FLOAT,
//         allowNull: true, // In kg
//     },
//     dimensions: {
//         type: DataTypes.STRING,
//         allowNull: true, // Format: LxWxH cm
//     },
//     expirationDate: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     },
//     tags: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//         allowNull: true,
//     },
//     unitId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     isActive: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true,
//     },
//     categoryId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'categories',
//             key: 'id',
//         },
//         onDelete: 'CASCADE',
//     }
// }, {
//     tableName: 'products',
//     timestamps: true,
//     hooks: {
//         beforeSave: (product) => {
//             // Auto-update status based on stock quantity
//             if (product.stockQuantity <= 0) {
//                 product.status = 'Out of Stock';
//             } else if (product.stockQuantity <= (product.lowStockThreshold || 10)) {
//                 product.status = 'Low Stock';
//             } else {
//                 product.status = 'In Stock';
//             }
//         },
//         afterFind: (products) => {
//             // Ensure array results are also processed
//             if (Array.isArray(products)) {
//                 products.forEach(product => {
//                     if (product.stockQuantity <= 0) {
//                         product.status = 'Out of Stock';
//                     } else if (product.stockQuantity <= (product.lowStockThreshold || 10)) {
//                         product.status = 'Low Stock';
//                     } else {
//                         product.status = 'In Stock';
//                     }
//                 });
//             } else if (products) {
//                 // Handle single instance
//                 if (products.stockQuantity <= 0) {
//                     products.status = 'Out of Stock';
//                 } else if (products.stockQuantity <= (products.lowStockThreshold || 10)) {
//                     products.status = 'Low Stock';
//                 } else {
//                     products.status = 'In Stock';
//                 }
//             }
//         }
//     }
// });

// export default Product;