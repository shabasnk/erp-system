// import { Sequelize, DataTypes } from 'sequelize';
// import sequelize from '../connect/connect.js';


// const Shop = sequelize.define('Shops', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   shopName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   ownerName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true,
//     },
//   },
//   phoneNumber: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   whatsappNumber: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   address: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   type: {
//     type: DataTypes.ENUM('retail', 'wholesale', 'both'),
//     allowNull: false,
//     defaultValue: 'retail',
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       len: [6, 255],
//     },
//   },
//   status: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true,
//   },
// });

// export default Shop;



















// fr shpownr bsed reprt
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../connect/connect.js';

const Shop = sequelize.define('Shops', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  shopName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  whatsappNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('retail', 'wholesale', 'both'),
    allowNull: false,
    defaultValue: 'retail',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 255],
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  // Add this options object if you don't have it already
  tableName: 'Shops', // Explicitly set table name
  timestamps: true, // Enable createdAt and updatedAt
});

// Add associations
Shop.associate = function(models) {
  Shop.hasMany(models.Customer, {
    foreignKey: 'shopId',
    as: 'Customers',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  
  Shop.hasMany(models.Invoice, {
    foreignKey: 'shopId',
    as: 'Invoices',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  
  Shop.hasMany(models.Product, {
    foreignKey: 'shopId',
    as: 'Products',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

export default Shop;