// //C:\coding\WEZ-ERP-APP\server\models\orderModel.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../connect/connect.js';

// const Order = sequelize.define('Order', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   customerId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'customers',
//       key: 'id'
//     }
//   },
//   totalAmount: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false
//   },
//   profit: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false
//   },
//   status: {
//     type: DataTypes.ENUM('Completed', 'Pending', 'Cancelled'),
//     defaultValue: 'Pending'
//   },
//   paymentMethod: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   tableName: 'orders',
//   timestamps: true
// });

// export default Order;






// for connecting the order and product tables.
// orderModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../connect/connect.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'customers',
      key: 'id'
    }
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  profit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Completed', 'Pending', 'Cancelled'),
    defaultValue: 'Pending'
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'orders',
  timestamps: true
});

// Add this association
Order.associate = function(models) {
  Order.belongsTo(models.Customer, {
    foreignKey: 'customerId',
    as: 'Customer'
  });
};

export default Order;