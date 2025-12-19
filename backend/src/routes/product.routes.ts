import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", authMiddleware, adminMiddleware, createProduct);

router.put("/:id", authMiddleware, adminMiddleware, updateProduct);

router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
