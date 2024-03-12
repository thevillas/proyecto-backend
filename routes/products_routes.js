import { Router } from "express";
import { getProducts, createProduct, updateProductById, deleteProductById, getProductById,} from "../controllers/products.controller.js";

const route_prod = Router();

route_prod.get("/products", getProducts);

route_prod.post("/createprod", createProduct);

route_prod.get("/products/:productId", getProductById);

route_prod.put("/products/:productId", updateProductById);

route_prod.delete("/products/:productId", deleteProductById);

export default route_prod;
