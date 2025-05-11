import express from "express";
import {register,login } from "../controller/authController.js";

const router = express.Router();

router.post("/register",register);

router.post("/login",login);

console.log("request comes");

export default router;
