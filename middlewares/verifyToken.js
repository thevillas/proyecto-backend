import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: 86400 // expira en 24 horas
  });
}

const verifyToken = async (req, res, next) => {
  
  const token = req.cookies.token;

  if (token) {
    try {
      const data = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = data;
      next();
    } catch (error) {
      res.status(400).json({ mensaje: "Token inválido" });
    }
  } else {
    res.status(400).json({ mensaje: "Debes enviar un token" });
  }
};

export default verifyToken;
