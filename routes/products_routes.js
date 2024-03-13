import { Router } from "express";
import { getProducts, createProduct, updateProductById, deleteProductById, getProductById,} from "../controllers/Produts_Crud.js";
import verifyToken from "../middlewares/verifyToken.js";
import { requireRole } from "../middlewares/roleVerification.js";


const route_prod = Router();

route_prod.get("/products",verifyToken, requireRole(['admin', 'moderador']),  getProducts);
route_prod.post("/createprod",verifyToken, requireRole(['admin', 'moderador']), createProduct);
route_prod.get("/products/:productId",verifyToken, requireRole(['admin', 'moderador']), getProductById);
route_prod.put("/products/:productId",verifyToken, requireRole(['admin', 'moderador']) ,updateProductById);
route_prod.delete("/products/:productId",verifyToken, requireRole(['admin', 'moderador']), deleteProductById);

export default route_prod;
