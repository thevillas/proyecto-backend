import express from "express";
import { login , register , getUserById } from "../controllers/controller_log.js";

import verifyToken from "../middlewares/verifyToken.js";

const route_log = express.Router();

route_log.get("/user", verifyToken , getUserById);
route_log.post("/register",register);
route_log.post("/login", login);

export default route_log;

