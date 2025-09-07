


// // In your authRouter.js
// import express from "express";
// // import { register, login, verifyEmail } from "../controller/authController.js";
// import { register, login } from "../controller/authController.js";


// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// // router.get("/verify-email/:token", verifyEmail); // Different endpoint

// export default router;








// fr shpownr rprt based tsting
// In your authRouter.js
import express from "express";
// import { register, login, verifyEmail } from "../controller/authController.js";
import { register, login } from "../controller/authController.js";

// Add this route to debug the token

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/verify-email/:token", verifyEmail); // Different endpoint

export default router;