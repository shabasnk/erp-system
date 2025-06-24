import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from 'pg';

import { sequelize } from "./models/index.js"; 

import sanitizedConfig from "./config.js";

import authRouter from "./routes/authRouter.js";

import { errorHandler, notFound } from "./middlewares/errorMiddlware.js";

import shopRouter from "./routes/shopRouter.js"

import productRouter from "./routes/productRouter.js";

import billingRouter from "./routes/billingRouter.js";




dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Sync database
sequelize.sync({ force: false })
  .then(() => console.log('Database synced!'))
  .catch(err => console.error('Error syncing the database:', err));

// Routes
app.use("/api/auth/", authRouter);
app.use("/api/shops",shopRouter)
app.use("/api/product",productRouter)
app.use("/api/billing",billingRouter)
app.use("/api/customer",customerRouter)


app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use(notFound);
app.use(errorHandler);

const PORT = sanitizedConfig.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));