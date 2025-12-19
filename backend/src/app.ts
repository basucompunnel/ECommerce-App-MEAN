import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "../src/routes/auth.routes";
import productRoutes from '../src/routes/product.routes'

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server working!");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;
