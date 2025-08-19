// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import pkg from 'pg';

// import { sequelize } from "./models/index.js"; 

// import sanitizedConfig from "./config.js";

// import authRouter from "./routes/authRouter.js";

// import { errorHandler, notFound } from "./middlewares/errorMiddlware.js";

// import shopRouter from "./routes/shopRouter.js"

// import productRouter from "./routes/productRouter.js";

// import billingRouter from "./routes/billingRouter.js";

// import customerRouter from "./routes/customerRouter.js"

// import reportRouter from "./routes/reportRouter.js";




// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));

// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// // Sync database
// sequelize.sync({ force: false })
//   .then(() => console.log('Database synced!'))
//   .catch(err => console.error('Error syncing the database:', err));

// // Routes
// app.use("/api/auth/", authRouter);
// app.use("/api/shops",shopRouter)
// app.use("/api/product",productRouter)
// app.use("/api/billing",billingRouter)
// app.use("/api/customer",customerRouter)
// app.use("/api/reports", reportRouter);



// app.get("/", (req, res) => {
//   res.send("API is running!");
// });

// app.use(notFound);
// app.use(errorHandler);

// const PORT = sanitizedConfig.PORT || 8080;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));















import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from 'pg';

// Model imports for seeding
import Customer from "./models/customerModel.js";
import Product from "./models/ProductModel.js";
import Order from "./models/orderModel.js";

import { sequelize } from "./models/index.js"; 
import sanitizedConfig from "./config.js";

import authRouter from "./routes/authRouter.js";
import { errorHandler, notFound } from "./middlewares/errorMiddlware.js";
import shopRouter from "./routes/shopRouter.js";
import productRouter from "./routes/productRouter.js";
import billingRouter from "./routes/billingRouter.js";
import customerRouter from "./routes/customerRouter.js";
import reportRouter from "./routes/reportRouter.js";

dotenv.config();

const app = express();

// Middleware setup
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database sync with test data seeding
sequelize.sync({ force: false })
  .then(async () => {
    console.log('Database synced!');
    
    // Only seed data in development environment
    if (process.env.NODE_ENV === 'development') {
      console.log('Seeding test data...');
      
      try {
        // Create test customer
        const [customer] = await Customer.findOrCreate({
          where: { email: 'test@example.com' },
          defaults: {
            name: 'Test Customer',
            phone: '1234567890',
            address: '123 Test Street'
          }
        });

        // Create test products
        await Product.bulkCreate([
          { 
            name: 'Product 1', 
            sku: 'PROD1', 
            stockQuantity: 15, 
            price: 10.99,
            description: 'Sample product description',
            category: 'Electronics'
          },
          { 
            name: 'Product 2', 
            sku: 'PROD2', 
            stockQuantity: 5, 
            price: 24.99,
            description: 'Another sample product',
            category: 'Clothing'
          },
          { 
            name: 'Product 3', 
            sku: 'PROD3', 
            stockQuantity: 0, 
            price: 49.99,
            description: 'Premium product',
            category: 'Home'
          }
        ]);

        // Create test orders with proper dates
        const now = new Date();
        await Order.bulkCreate([
          {
            customerId: customer.id,
            totalAmount: 100.50,
            profit: 20.10,
            status: 'Completed',
            paymentMethod: 'Credit Card',
            createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
          },
          {
            customerId: customer.id,
            totalAmount: 75.25,
            profit: 15.05,
            status: 'Completed',
            paymentMethod: 'Cash',
            createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
          },
          {
            customerId: customer.id,
            totalAmount: 150.75,
            profit: 30.15,
            status: 'Pending',
            paymentMethod: 'Credit Card',
            createdAt: now // Today
          },
          {
            customerId: customer.id,
            totalAmount: 200.00,
            profit: 40.00,
            status: 'Completed',
            paymentMethod: 'Bank Transfer',
            createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
          }
        ]);
        
        console.log('Test data seeded successfully!');
      } catch (error) {
        console.error('Error seeding test data:', error);
      }
    }
  })
  .catch(err => console.error('Error syncing the database:', err));

// Routes
app.use("/api/auth/", authRouter);
app.use("/api/shops", shopRouter);
app.use("/api/product", productRouter);
app.use("/api/billing", billingRouter);
app.use("/api/customer", customerRouter);
app.use("/api/reports", reportRouter);

app.get("/", (req, res) => {
  res.send("API is running!");
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = sanitizedConfig.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));