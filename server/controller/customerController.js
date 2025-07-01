// import Customer from '../models/customerModel.js';

// // Create a new customer
// export const createCustomer = async (req, res) => {
//   try {
//     const { useSameAsPhone, phone, ...customerData } = req.body;

//     // If WhatsApp number is same as phone, set it
//     const whatsappNumber = useSameAsPhone ? phone : customerData.whatsappNumber;

//     const customer = await Customer.create({
//       ...customerData,
//       whatsappNumber,
//     });

//     res.status(201).json({
//       success: true,
//       data: customer,
//     });
//   } catch (error) {
//     if (error.name === 'SequelizeUniqueConstraintError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Email or phone number already exists.',
//       });
//     }
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create customer.',
//       error: error.message,
//     });
//   }
// };











// import Customer from '../models/customerModel.js';

// // Create a new customer
// export const createCustomer = async (req, res) => {
//   console.log("createdCustomer hitted");
  
//   try {
//     console.log("under customer try");
    
//     const { useSameAsPhone, phone, ...customerData } = req.body;

//     console.log("req.body:",req.body);
    

//     // If WhatsApp number is same as phone, set it
//     const whatsappNumber = useSameAsPhone ? phone : customerData.whatsappNumber;

//     const customer = await Customer.create({
//       ...customerData,
//       whatsappNumber,
//       // shopId: req.user.shopId // Assuming you have shopId in the user object
//     });

//     console.log("customer:",customer);
    

//     res.status(201).json({
//       success: true,
//       data: customer,
//     });
//   } catch (error) {
//     console.log("under error");

//       console.log("Full error object:", error);
//   console.log("Error name:", error.name);
//   console.log("Error message:", error.message);
//   console.log("Error stack:", error.stack);
    
//     if (error.name === 'SequelizeUniqueConstraintError') {
//       return res.status(400).json({
        
//         success: false,
//         message: 'Email or phone number already exists.',
//       });
//     }
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create customer.',
//       error: error.message,
//     });
//   }
// };








import Customer from '../models/customerModel.js';

// Create a new customer
export const createCustomer = async (req, res) => {
  
  try {
    
    const { useSameAsPhone, phone, ...customerData } = req.body;


    const cleanedPhone = phone.toString().trim().replace(/\D/g, '');

    if (cleanedPhone.length !== 10) {
  return res.status(400).json({
    success: false,
    message: 'Phone number must be exactly 10 digits'
  });
}

    // If WhatsApp number is same as phone, set it
    const whatsappNumber = useSameAsPhone ? phone : customerData.whatsappNumber;

    const customer = await Customer.create({
      ...customerData,
      phone: cleanedPhone,
  whatsappNumber: useSameAsPhone ? cleanedPhone : customerData.whatsappNumber
    });

    console.log("customer:",customer);
    

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
  console.log("under error");
  console.log("Full error object:", error);
  console.log("Error name:", error.name);
  console.log("Error message:", error.message);
  console.log("Error stack:", error.stack);
    
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






