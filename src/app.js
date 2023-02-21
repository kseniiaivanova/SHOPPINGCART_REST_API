require("dotenv").config();

require("express-async-errors");

const express = require("express");

const mongoose = require("mongoose");

const productRoutes = require("./routes/productRoutes");

const cartRoutes = require("./routes/cartRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);

  next();
});

app.use("/api/v1/carts" /* /... = see Router => */, cartRoutes);

app.use("/api/v1/products" /* /... = see Router => */, productRoutes);

const port = process.env.PORT || 5000;

async function run() {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();
