import express from "express";
import { login , register , getUserById } from "../controllers/controller.js";

import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/user", verifyToken , getUserById);
router.post("/register",register);
router.post("/login", login);

export default router;

