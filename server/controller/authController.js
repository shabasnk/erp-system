

// import asyncHandler from "express-async-handler";
// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
// import Shop from "../models/shopModel.js";

// // Helper to generate token - UPDATED
// const generateToken = (user) => {

//     console.log('=== JWT SECRET DEBUG in GENERATE TOKEN ===');
//     console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
//     console.log('JWT_SECRET value:', process.env.JWT_SECRET ? '***HIDDEN***' : 'MISSING');


//     console.log('=== GENERATED TOKEN DEBUG ===');
//     console.log('User object:', {
//         id: user.id,
//         ownerName: user.ownerName,
//         email: user.email,
//         shopName: user.shopName
//     });

//     console.log('Generated token will contain:', {
//         id: user.id,
//         name: user.ownerName,
//         email: user.email,
//         shopId: user.id,
//         shopName: user.shopName
//     });
//     console.log('=============================');

//     return jwt.sign({ 
//         id: user.id,
//         name: user.ownerName,
//         email: user.email,
//         shopId: user.id,
//         shopName: user.shopName
//     }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//     });
// };

// // @desc    Register a new shop
// // @route   POST /api/auth/register
// // @access  Public
// export const register = asyncHandler(async (req, res) => {
//      console.log('=== JWT SECRET DEBUG in REGISTER ===');
//     console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
//     console.log('JWT_SECRET value:', process.env.JWT_SECRET ? '***HIDDEN***' : 'MISSING');
//     console.log('All environment variables:', Object.keys(process.env));


//     console.log("Registration request received:", req.body);
    
//     const {
//         shopName,
//         ownerName,
//         email,
//         phoneNumber,
//         whatsappNumber,
//         address,
//         type,
//         password
//     } = req.body;

//     // Check if all required fields are provided
//     if (!shopName || !ownerName || !email || !phoneNumber || !address || !password) {
//         res.status(400);
//         throw new Error("Please provide all required fields");
//     }

//     // Check if user already exists
//     const userExists = await Shop.findOne({
//         where: { email: email.toLowerCase() }
//     });

//     if (userExists) {
//         res.status(400);
//         throw new Error("User already exists with this email");
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//     const user = await Shop.create({
//         shopName,
//         ownerName,
//         email: email.toLowerCase(),
//         phoneNumber,
//         whatsappNumber: whatsappNumber || null,
//         address,
//         type: type || 'retail',
//         password: hashedPassword,
//         status: true
//     });

//     if (user) {
//         // Convert Sequelize instance to plain object
//         const userPlain = user.get({ plain: true });
        
//         res.status(201).json({
//             user: {
//                 id: userPlain.id,
//                 name: userPlain.ownerName,
//                 email: userPlain.email,
//                 shopId: userPlain.id,
//                 shopName: userPlain.shopName,
//             },
//             token: generateToken(userPlain), // Pass plain object here
//             message: "Registration successful"
//         });
//     } else {
//         res.status(400);
//         throw new Error("Invalid user data");
//     }
// });

// export const login = asyncHandler(async (req, res) => {
//     console.log("Login request received:", req.body);
//      // === ADD DEBUG LOGS HERE ===
//     console.log('=== JWT SECRET DEBUG in LOGIN ===');
//     console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
//     console.log('JWT_SECRET value:', process.env.JWT_SECRET ? '***HIDDEN***' : 'MISSING');
//     console.log('All environment variables:', Object.keys(process.env));
//     // === END DEBUG LOGS ===
    
//     const { email, password } = req.body;

//     if (!email || !password) {
//         res.status(400);
//         throw new Error("Please provide both email and password");
//     }

//     const user = await Shop.findOne({
//         where: { email: email.toLowerCase() }
//     });

//     if (!user) {
//         res.status(401);
//         throw new Error("Invalid email or password");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
    
//     if (!isMatch) {
//         res.status(401);
//         throw new Error("Invalid email or password");
//     }

//     // Convert Sequelize instance to plain object
//     const userPlain = user.get({ plain: true });

//     // Send response with token AND shop information
//     res.status(200).json({
//         id: userPlain.id,
//         name: userPlain.ownerName,
//         email: userPlain.email,
//         shopId: userPlain.id,
//         shopName: userPlain.shopName,
//         token: generateToken(userPlain), // Pass plain object here
//     });
// });







import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import Shop from "../models/shopModel.js";

// Helper to generate token - UPDATED
const generateToken = (user) => {
    // Use environment variable OR hardcoded as fallback
    const JWT_SECRET = process.env.JWT_SECRET || "wez_erp_super_secure_2025_8281@!";
    
    console.log('=== JWT SECRET DEBUG ===');
    console.log('JWT_SECRET env exists:', !!process.env.JWT_SECRET);
    console.log('JWT_SECRET value:', process.env.JWT_SECRET ? 'SET' : 'MISSING');
    
    return jwt.sign({ 
        id: user.id,
        name: user.ownerName,
        email: user.email,
        shopId: user.id,
        shopName: user.shopName
    }, JWT_SECRET, {
        expiresIn: "7d",
    });
};


// @desc    Register a new shop
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
     console.log('=== JWT SECRET DEBUG in REGISTER ===');
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('JWT_SECRET value:', process.env.JWT_SECRET ? '***HIDDEN***' : 'MISSING');
    console.log('All environment variables:', Object.keys(process.env));


    console.log("Registration request received:", req.body);
    
    const {
        shopName,
        ownerName,
        email,
        phoneNumber,
        whatsappNumber,
        address,
        type,
        password
    } = req.body;

    // Check if all required fields are provided
    if (!shopName || !ownerName || !email || !phoneNumber || !address || !password) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    // Check if user already exists
    const userExists = await Shop.findOne({
        where: { email: email.toLowerCase() }
    });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists with this email");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await Shop.create({
        shopName,
        ownerName,
        email: email.toLowerCase(),
        phoneNumber,
        whatsappNumber: whatsappNumber || null,
        address,
        type: type || 'retail',
        password: hashedPassword,
        status: true
    });

    if (user) {
        // Convert Sequelize instance to plain object
        const userPlain = user.get({ plain: true });
        
        res.status(201).json({
            user: {
                id: userPlain.id,
                name: userPlain.ownerName,
                email: userPlain.email,
                shopId: userPlain.id,
                shopName: userPlain.shopName,
            },
            token: generateToken(userPlain), // Pass plain object here
            message: "Registration successful"
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export const login = asyncHandler(async (req, res) => {
    console.log("Login request received:", req.body);
     // === ADD DEBUG LOGS HERE ===
    console.log('=== JWT SECRET DEBUG in LOGIN ===');
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('JWT_SECRET value:', process.env.JWT_SECRET ? '***HIDDEN***' : 'MISSING');
    console.log('All environment variables:', Object.keys(process.env));
    // === END DEBUG LOGS ===
    
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide both email and password");
    }

    const user = await Shop.findOne({
        where: { email: email.toLowerCase() }
    });

    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    // Convert Sequelize instance to plain object
    const userPlain = user.get({ plain: true });

    // Send response with token AND shop information
    res.status(200).json({
        id: userPlain.id,
        name: userPlain.ownerName,
        email: userPlain.email,
        shopId: userPlain.id,
        shopName: userPlain.shopName,
        token: generateToken(userPlain), // Pass plain object here
    });
});