import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { requireRole } from "../middlewares/roleVerification.js";
import { createImage, getAllImages , updateImageById, getImageById, deleteImageById } from "../controllers/galery_crud.js";

const route_galery = Router();

route_galery.get("/getall", verifyToken, requireRole(['admin','moderador']), getAllImages);
route_galery.delete("/delete/:id", verifyToken, requireRole(['admin','moderador']), deleteImageById);
route_galery.post("/create",  createImage);
route_galery.get("/getall/:id",  getImageById);
route_galery.put("/update/:id",  updateImageById);

export default route_galery;