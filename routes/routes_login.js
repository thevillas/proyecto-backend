import express from "express";
import { login , register , getUserById, logout  } from "../controllers/Login_controller.js";

import verifyToken from "../middlewares/verifyToken.js";
import jwt from "jsonwebtoken"



const loginWithCookie = async (req, res) => {
    
    const token = jwt.sign({ id: user }, 'your-secret-key');

    
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });

    res.status(200).json({ message: 'Usuario autenticado correctamente' });
};



const route_log = express.Router();

route_log.get('/user', verifyToken, getUserById);
route_log.post("/register",register);
route_log.post("/login", login);
route_log.get("/salir", logout);

export default route_log;

