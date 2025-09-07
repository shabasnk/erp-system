// import asyncHandler from "express-async-handler";
// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
// import Shop from "../models/shopModel.js";

// // Helper to generate token
// const generateToken = (userId) => {
//     return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//     });
// };

// // @desc    Register a new shop
// // @route   POST /api/auth/register
// // @access  Public
// export const register = asyncHandler(async (req, res) => {
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
//     // Get the full user object (excluding password)
//     const userResponse = await Shop.findByPk(user.id, {
//         attributes: { exclude: ['password'] }
//     });
    
//     res.status(201).json({
//         user: userResponse,
//         token: generateToken(user.id),
//         message: "Registration successful"
//     });
// } else {
//         res.status(400);
//         throw new Error("Invalid user data");
//     }
// });

// export const login = asyncHandler(async (req, res) => {
//     console.log("Login request received:", req.body);
    
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

//     // Send response with token
//     res.status(200).json({
//         id: user.id,
//         name: user.ownerName,
//         email: user.email,
//         token: generateToken(user.id),
//     });
// });

















// // for shopowner reprt
// import asyncHandler from "express-async-handler";
// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
// import Shop from "../models/shopModel.js";

// // Helper to generate token
// const generateToken = (userId) => {
//     return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//     });
// };

// // @desc    Register a new shop
// // @route   POST /api/auth/register
// // @access  Public
// export const register = asyncHandler(async (req, res) => {
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
//         res.status(201).json({
//             user: {
//                 id: user.id,
//                 name: user.ownerName,
//                 email: user.email,
//                 shopId: user.id, // Add shop ID
//                 shopName: user.shopName, // Add shop name
//             },
//             token: generateToken(user), 
//             message: "Registration successful"
//         });
//     } else {
//         res.status(400);
//         throw new Error("Invalid user data");
//     }
// });







// export const login = asyncHandler(async (req, res) => {
//     console.log("Login request received:", req.body);
    
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

//     // Send response with token AND shop information
//     res.status(200).json({
//         id: user.id,
//         name: user.ownerName,
//         email: user.email,
//         shopId: user.id, // Shop ID is the same as user ID
//         shopName: user.shopName, // Add shop name
//         token: generateToken(user),
//     });
// });










// import asyncHandler from "express-async-handler";
// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
// import Shop from "../models/shopModel.js";

// // Helper to generate token - UPDATED
// const generateToken = (user) => {
// //
//     console.log('=== GENERATED TOKEN DEBUG ===');
// console.log('User object:', {
//     id: user.id,
//     ownerName: user.ownerName,
//     email: user.email,
//     shopName: user.shopName
// });

// console.log('Generated token will contain:', {
//     id: user.id,
//     name: user.ownerName,
//     email: user.email,
//     shopId: user.id,
//     shopName: user.shopName
// });
// console.log('=============================');

// //

//     return jwt.sign({ 
//         id: user.id,
//         name: user.ownerName,
//         email: user.email,
//         shopId: user.id, // Add shopId to the token payload
//         shopName: user.shopName // Add shopName to the token payload
//     }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//     });
// };

// // @desc    Register a new shop
// // @route   POST /api/auth/register
// // @access  Public
// export const register = asyncHandler(async (req, res) => {
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
//         res.status(201).json({
//             user: {
//                 id: user.id,
//                 name: user.ownerName,
//                 email: user.email,
//                 shopId: user.id,
//                 shopName: user.shopName,
//             },
//             token: generateToken(user), // Pass user object here
//             message: "Registration successful"
//         });
//     } else {
//         res.status(400);
//         throw new Error("Invalid user data");
//     }
// });

// export const login = asyncHandler(async (req, res) => {
//     console.log("Login request received:", req.body);
    
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

//     // Send response with token AND shop information
//     res.status(200).json({
//         id: user.id,
//         name: user.ownerName,
//         email: user.email,
//         shopId: user.id,
//         shopName: user.shopName,
//         token: generateToken(user), // Pass user object here
//     });
// });









import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import Shop from "../models/shopModel.js";

// Helper to generate token - UPDATED
const generateToken = (user) => {
    console.log('=== GENERATED TOKEN DEBUG ===');
    console.log('User object:', {
        id: user.id,
        ownerName: user.ownerName,
        email: user.email,
        shopName: user.shopName
    });

    console.log('Generated token will contain:', {
        id: user.id,
        name: user.ownerName,
        email: user.email,
        shopId: user.id,
        shopName: user.shopName
    });
    console.log('=============================');

    return jwt.sign({ 
        id: user.id,
        name: user.ownerName,
        email: user.email,
        shopId: user.id,
        shopName: user.shopName
    }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// @desc    Register a new shop
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
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