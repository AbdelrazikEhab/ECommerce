import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import prodctRout from "./routes/productRout.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRout.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running.....");
});

app.use("/api/products", prodctRout);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);
const Port = process.env.PORT || 5000;

app.listen(
  Port,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${Port}`.yellow.bold
  )
);
