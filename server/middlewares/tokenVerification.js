//C:\coding\WEZ-ERP-APP\server\middlewares\tokenVerification.js
import jwt from 'jsonwebtoken';
import { sanitizedConfig } from '../config.js';

// Middleware to verify JWT
export function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract JWT token
  
    if (!token) {
      return res.status(403).send('Token is required');
    }
  
    jwt.verify(token, sanitizedConfig.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }

      // DEBUG: Check what's actually in the token
        console.log('=== DECODED TOKEN CONTENT ===');
        console.log('Full decoded token:', decoded);
        console.log('Shop ID in token:', decoded.shopId);
        console.log('Shop Name in token:', decoded.shopName);
        console.log('=============================');

        
      req.user = decoded;
      next();
    });
  }















// // for shp owner based reprt
// // C:\coding\WEZ-ERP-APP\server\middlewares\tokenVerification.js
// import jwt from 'jsonwebtoken';
// import sanitizedConfig from '../config.js';
// import User from '../models/UserModel.js'; // Import your User model

// // Middleware to verify JWT and fetch complete user data
// export async function verifyToken(req, res, next) {
//   try {
//     const token = req.headers['authorization']?.split(' ')[1]; // Extract JWT token

//     if (!token) {
//       return res.status(403).json({ success: false, error: 'Token is required' });
//     }

//     const decoded = jwt.verify(token, sanitizedConfig.JWT_SECRET);
    
//     // Fetch complete user data including shopId from database
//     const user = await User.findByPk(decoded.id, {
//       attributes: ['id', 'shopId', 'email', 'name'] // Include all needed fields
//     });

//     if (!user) {
//       return res.status(401).json({ success: false, error: 'User not found' });
//     }

//     // Add complete user data to request
//     req.user = {
//       id: user.id,
//       shopId: user.shopId, // This is crucial for your reports
//       email: user.email,
//       name: user.name
//     };

//     console.log('Authenticated user:', req.user); // For debugging
//     next();
//   } catch (err) {
//     console.error('Token verification error:', err);
//     return res.status(401).json({ success: false, error: 'Invalid token' });
//   }
// }