// import { DataTypes } from 'sequelize';
// import sequelize from '../connect/connect.js';
// import Customer from './customerModel.js';

// const Invoice = sequelize.define('Invoice', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   customerId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Customer,
//       key: 'id'
//     }
//   },
//   invoiceNumber: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false
//   },
//   subtotal: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false
//   },
//   tax: {
//     type: DataTypes.DECIMAL(10, 2),
//     defaultValue: 0
//   },
//   total: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false
//   },
//   paymentMethod: {
//     type: DataTypes.ENUM('cash', 'card', 'upi', 'bank_transfer'),
//     allowNull: false
//   },
//   status: {
//     type: DataTypes.ENUM('pending', 'completed', 'cancelled', 'refunded'),
//     defaultValue: 'completed'
//   },
//   gstPercentage: {
//     type: DataTypes.DECIMAL(5, 2),
//     allowNull: true
//   },
//   notes: {
//     type: DataTypes.TEXT,
//     allowNull: true
//   },
//   dueDate: {
//     type: DataTypes.DATE,
//     allowNull: true
//   }
// }, {
//   timestamps: true,
//   paranoid: true, // Enable soft deletion
//   hooks: {
//     beforeCreate: async (invoice) => {
//       if (!invoice.invoiceNumber) {
//         // Generate invoice number (customize this as needed)
//         const date = new Date();
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         const count = await Invoice.count();
//         invoice.invoiceNumber = `INV-${year}${month}${day}-${1000 + count + 1}`;
//       }
//     }
//   }
// });

// // Associations
// Invoice.belongsTo(Customer, { foreignKey: 'customerId' });
// Customer.hasMany(Invoice, { foreignKey: 'customerId' });

// export default Invoice;













// for green api after 12 digit invoice issue solving
import { DataTypes } from 'sequelize';
import sequelize from '../connect/connect.js';
import Customer from './customerModel.js';

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Customer,
      key: 'id'
    }
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'card', 'upi', 'bank_transfer'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled', 'refunded'),
    defaultValue: 'completed'
  },
  gstPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true, // Enable soft deletion
  hooks: {
    beforeCreate: async (invoice) => {
      if (!invoice.invoiceNumber) {
        const date = new Date();
        const timestamp = date.getTime();
        const random = Math.floor(Math.random() * 1000);
        invoice.invoiceNumber = `INV-${timestamp}-${random}`;
      }
    }
  }
});

// Associations
Invoice.belongsTo(Customer, { foreignKey: 'customerId' });
Customer.hasMany(Invoice, { foreignKey: 'customerId' });

export default Invoice;


