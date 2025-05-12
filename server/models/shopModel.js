
// import { DataTypes } from 'sequelize';
// import sequelize from '../connect/connect.js';

// const Shop = sequelize.define('Shop', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   type: {
//     type: DataTypes.ENUM('Retail', 'Wholesale', 'Both'),
//     allowNull: false,
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// export default Shop;







import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../connect/connect.js';
import bcrypt from 'bcrypt';

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
});

export default Shop;

