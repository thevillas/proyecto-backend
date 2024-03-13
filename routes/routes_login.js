import express from "express";
import { login , register , getUserById, logout  } from "../controllers/Login_controller.js";

import verifyToken from "../middlewares/verifyToken.js";

const route_log = express.Router();

route_log.get('/user', verifyToken, getUserById);
route_log.post("/register",register);
route_log.post("/login", login);
route_log.get("/salir", logout);

export default route_log;

