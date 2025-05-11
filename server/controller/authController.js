
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Shop from "../models/shopModel.js"; // Adjust the import path if needed

// // @desc    Authenticate and register Admin
// // @route   POST /api/Admin/auth
// // @access  Public
export const register = asyncHandler(async (req, res) => {
  

});






// Helper to generate token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // You can change this
    });
};

export const login = asyncHandler(async (req, res) => {
    console.log("inside login");
    
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

    // Send response with token
    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
    });
});