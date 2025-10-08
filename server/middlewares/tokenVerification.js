// import jwt from 'jsonwebtoken';

// // Middleware to verify JWT
// export function verifyToken(req, res, next) {
//     const token = req.headers['authorization']?.split(' ')[1]; // Extract JWT token
  
//     if (!token) {
//       return res.status(403).send('Token is required');
//     }
  
//     // FIX: Use process.env.JWT_SECRET directly, not from config
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).send('Invalid token');
//       }

//       // DEBUG: Check what's actually in the token
//       console.log('=== DECODED TOKEN CONTENT ===');
//       console.log('Full decoded token:', decoded);
//       console.log('Shop ID in token:', decoded.shopId);
//       console.log('Shop Name in token:', decoded.shopName);
//       console.log('=============================');
        
//       req.user = decoded;
//       next();
//     });
// }










import jwt from 'jsonwebtoken';

// Middleware to verify JWT
export function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(403).send('Token is required');
    }
  
    // TEMPORARY HARDCODE - Use same secret
    const JWT_SECRET = "wez_erp_super_secure_2025_8281@!";
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }
        
      req.user = decoded;
      next();
    });
}