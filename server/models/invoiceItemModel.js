//C:\coding\WEZ-ERP-APP\server\models\invoiceItemModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../connect/connect.js';
import Invoice from './invoiceModel.js';
import Product from './ProductModel.js';

const InvoiceItem = sequelize.define('InvoiceItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoiceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Invoice,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
}, {
  timestamps: false
});

// Associations
InvoiceItem.belongsTo(Invoice, { foreignKey: 'invoiceId' });
Invoice.hasMany(InvoiceItem, { foreignKey: 'invoiceId' });

InvoiceItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(InvoiceItem, { foreignKey: 'productId' });

export default InvoiceItem;