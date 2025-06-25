import Customer from '../models/customerModel.js';

// Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const { useSameAsPhone, phone, ...customerData } = req.body;

    // If WhatsApp number is same as phone, set it
    const whatsappNumber = useSameAsPhone ? phone : customerData.whatsappNumber;

    const customer = await Customer.create({
      ...customerData,
      whatsappNumber,
    });

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Email or phone number already exists.',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create customer.',
      error: error.message,
    });
  }
};
