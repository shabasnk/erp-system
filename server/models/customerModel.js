// import { DataTypes } from 'sequelize';
// import sequelize from '../connect/connect.js';


// const Customer = sequelize.define('Customer', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   companyName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true,
//       notEmpty: true
//     }
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       is: /^[0-9]{10}$/,
//       notEmpty: true
//     }
//   },
//   whatsappNumber: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       is: /^[0-9]{10}$/,
//       notEmpty: true
//     }
//   },
//   address: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   gstNumber: {
//     type: DataTypes.STRING,
//     validate: {
//       isGSTNumber(value) {
//         if (value && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)) {
//           throw new Error('Invalid GST number format');
//         }
//       }
//     }
//   },
//   gstPercentage: {
//     type: DataTypes.DECIMAL(5, 2),
//     validate: {
//       min: 0,
//       max: 100
//     }
//   },
//   useSameAsPhone: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   }
// }, {
//   timestamps: true,
//   createdAt: 'createdAt',
//   updatedAt: 'updatedAt'
// });

// export default Customer;










// models/CustomerModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../connect/connect.js';

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Company name is required'
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Customer name is required'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Please enter a valid email address'
            },
            notEmpty: {
                msg: 'Email is required'
            }
        }
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            is: {
                args: /^[0-9]{10}$/,
                msg: 'Please enter a valid 10-digit phone number'
            },
            notEmpty: {
                msg: 'Phone number is required'
            }
        }
    },
    whatsappNumber: {
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
            is: {
                args: /^[0-9]{10}$/,
                msg: 'Please enter a valid 10-digit WhatsApp number'
            }
        }
    },
    useSameAsPhone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Address is required'
            }
        }
    },
    gstNumber: {
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
            isValidGST(value) {
                if (value && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)) {
                    throw new Error('Please enter a valid GST number (format: 22AAAAA0000A1Z5)');
                }
            }
        }
    },
    gstPercentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 18.00,
        validate: {
            isFloat: {
                min: 0,
                max: 100,
                msg: 'Please enter a valid percentage between 0 and 100'
            }
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'customers',
    timestamps: true,
    hooks: {
        beforeValidate: (customer) => {
            // Ensure GST percentage is set if GST number exists
            if (customer.gstNumber && !customer.gstPercentage) {
                customer.gstPercentage = 18.00;
            }
            
            // Set WhatsApp number to phone if useSameAsPhone is true
            if (customer.useSameAsPhone) {
                customer.whatsappNumber = customer.phone;
            }
        }
    }
});

export default Customer;