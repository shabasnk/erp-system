const Customer = require('../models/customerModel');

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    // If whatsapp number is same as phone, set it
    if (req.body.useSameAsPhone) {
      req.body.whatsappNumber = req.body.phone;
    }

    const customer = await Customer.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        customer
      }
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already exists'
      });
    }
    
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
