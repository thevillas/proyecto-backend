import { Router } from "express";
import { getProducts, createProduct, updateProductById, deleteProductById, getProductById,} from "../controllers/products.controller.js";

const route_prod = Router();

route_prod.get("/product", getProducts);

route_prod.get("/:productId", getProductById);

route_prod.post("/", createProduct);

route_prod.put("/:productId", updateProductById);

route_prod.delete("/:productId", deleteProductById);

export default route_prod;
