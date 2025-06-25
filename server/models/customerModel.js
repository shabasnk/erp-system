import { DataTypes } from 'sequelize';
import sequelize from '../connect/connect.js';


const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]{10}$/,
      notEmpty: true
    }
  },
  whatsappNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]{10}$/,
      notEmpty: true
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  gstNumber: {
    type: DataTypes.STRING,
    validate: {
      isGSTNumber(value) {
        if (value && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)) {
          throw new Error('Invalid GST number format');
        }
      }
    }
  },
  gstPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    validate: {
      min: 0,
      max: 100
    }
  },
  useSameAsPhone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

export default Customer;