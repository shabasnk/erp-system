// // for green api
// // models/CustomerModel.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../connect/connect.js';

// const Customer = sequelize.define('Customer', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     companyName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: {
//                 msg: 'Company name is required'
//             }
//         }
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: {
//                 msg: 'Customer name is required'
//             }
//         }
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             isEmail: {
//                 msg: 'Please enter a valid email address'
//             },
//             notEmpty: {
//                 msg: 'Email is required'
//             }
//         }
//     },
//     phone: {
//     type: DataTypes.STRING(12),
//     allowNull: false,
//     validate: {
//         is: {
//             args: /^[0-9]{12}$/, // Changed from /^[0-11]{12}$/
//             msg: 'Please enter a valid 12-digit phone number (including country code)' // Updated message
//         },
//         notEmpty: {
//             msg: 'Phone number is required'
//         }
//     }
//     },
//     whatsappNumber: {
//     type: DataTypes.STRING(12),
//     allowNull: true,
//     validate: {
//         is: {
//             args: /^[0-9]{12}$/, // Changed from /^[0-11]{12}$/
//             msg: 'Please enter a valid 12-digit WhatsApp number (including country code)' // Updated message
//         }
//     }
//     },
//     useSameAsPhone: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true
//     },
//     address: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         validate: {
//             notEmpty: {
//                 msg: 'Address is required'
//             }
//         }
//     },
//     gstNumber: {
//         type: DataTypes.STRING(15),
//         allowNull: true,
//         validate: {
//             isValidGST(value) {
//                 if (value && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)) {
//                     throw new Error('Please enter a valid GST number (format: 22AAAAA0000A1Z5)');
//                 }
//             }
//         }
//     },
//     gstPercentage: {
//         type: DataTypes.DECIMAL(5, 2),
//         allowNull: true,
//         defaultValue: 18.00,
//         validate: {
//             isFloat: {
//                 min: 0,
//                 max: 100,
//                 msg: 'Please enter a valid percentage between 0 and 100'
//             }
//         }
//     },
//     isActive: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true
//     }
// }, {
//     tableName: 'customers',
//     timestamps: true,
//     hooks: {
//         beforeValidate: (customer) => {
//             // Ensure GST percentage is set if GST number exists
//             if (customer.gstNumber && !customer.gstPercentage) {
//                 customer.gstPercentage = 18.00;
//             }
            
//             // Set WhatsApp number to phone if useSameAsPhone is true
//             if (customer.useSameAsPhone) {
//                 customer.whatsappNumber = customer.phone;
//             }
//         }
//     }
// });

// export default Customer;






// customer model after the association with order model for reportManagement for sales tacking.
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
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            is: {
                args: /^[0-9]{12}$/,
                msg: 'Please enter a valid 12-digit phone number (including country code)'
            },
            notEmpty: {
                msg: 'Phone number is required'
            }
        }
    },
    whatsappNumber: {
        type: DataTypes.STRING(12),
        allowNull: true,
        validate: {
            is: {
                args: /^[0-9]{12}$/,
                msg: 'Please enter a valid 12-digit WhatsApp number (including country code)'
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

// Define associations
Customer.associate = function(models) {
    Customer.hasMany(models.Order, {
        foreignKey: 'customerId',
        as: 'Orders',
        onDelete: 'SET NULL', // or 'CASCADE' based on your requirements
        onUpdate: 'CASCADE'
    });
};

export default Customer;