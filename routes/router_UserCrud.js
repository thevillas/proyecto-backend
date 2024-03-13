import express from "express";
import { create, update, deleteUser, getAll, getOne } from "../controllers/UserCrud.js";
import verifyToken from "../middlewares/verifyToken.js";
import { requireRole } from "../middlewares/roleVerification.js";

const route_crud = express.Router();

route_crud.post("/create", create);
route_crud.get("/getall", verifyToken, requireRole(['admin', 'moderador']), getAll);
route_crud.get("/getall/:id", verifyToken, requireRole(['admin', 'moderador']), getOne);
route_crud.put("/update/:id", verifyToken, requireRole(['admin', 'moderador']), update);
route_crud.delete("/delete/:id", verifyToken, requireRole(['admin', 'moderador']), deleteUser);

export default route_crud;