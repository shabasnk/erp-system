
import { DataTypes } from 'sequelize';
import sequelize from '../connect/connect.js';

const Shop = sequelize.define('Shop', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Retail', 'Wholesale', 'Both'),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Shop;