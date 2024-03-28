import express from "express";
import { create, update, deleteUser, getAll, getOne } from "../controllers/UserCrud.js";
import verifyToken from "../middlewares/verifyToken.js";
import { requireRole } from "../middlewares/roleVerification.js";
import { changeRole } from "../middlewares/changeRole.js";

const route_crud = express.Router();

route_crud.get("/getall", verifyToken, requireRole(['admin', 'moderador']), getAll);
route_crud.delete("/delete/:id", verifyToken, requireRole(['admin', 'moderador']), deleteUser);
route_crud.put("/changerole", verifyToken, requireRole(['admin']), changeRole);
route_crud.post("/create", create);
route_crud.get("/getall/:id",  getOne);
route_crud.put("/update/:id", update);

export default route_crud;