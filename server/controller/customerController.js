// import Customer from '../models/customerModel.js';

// // Create a new customer
// export const createCustomer = async (req, res) => {
  
//   try {
    
//     const { useSameAsPhone, phone, ...customerData } = req.body;


//     const cleanedPhone = phone.toString().trim().replace(/\D/g, '');

//     if (cleanedPhone.length !== 10) {
//   return res.status(400).json({
//     success: false,
//     message: 'Phone number must be exactly 10 digits'
//   });
// }

//     // If WhatsApp number is same as phone, set it
//     const whatsappNumber = useSameAsPhone ? phone : customerData.whatsappNumber;

//     const customer = await Customer.create({
//       ...customerData,
//       phone: cleanedPhone,
//   whatsappNumber: useSameAsPhone ? cleanedPhone : customerData.whatsappNumber
//     });

//     console.log("customer:",customer);
    

//     res.status(201).json({
//       success: true,
//       data: customer,
//     });
//   } catch (error) {
//   console.log("under error");
//   console.log("Full error object:", error);
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









// for green api (12 dgt i thnk)
//C:\coding\WEZ-ERP-APP\server\controller\customerController.js
import Customer from '../models/customerModel.js';

// Create a new customer
export const createCustomer = async (req, res) => {
  
  try {
    
    const { useSameAsPhone, phone, ...customerData } = req.body;


    const cleanedPhone = phone.toString().trim().replace(/\D/g, '');

    if (cleanedPhone.length !== 12) {
  return res.status(400).json({
    success: false,
    message: 'Phone number must be exactly 12 digits (including country code)' // Updated message
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






