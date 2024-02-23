import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.headers["token"];

  if (token) {
    try {
      const data = await jwt.verify(token, "secreto");
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
