import express from "express";
import { create, update, deleteUser, getAll, getOne } from "../controllers/users.controller.js";

const route_crud = express.Router();

route_crud.post("/create", create);
route_crud.get("/getall", getAll);
route_crud.get("/getone/:id", getOne);
route_crud.put("/update/:id", update);
route_crud.delete("/delete/:id", deleteUser);

export default route_crud;