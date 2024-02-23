import bcrypt from "bcrypt";
import Usuario from "../model/usuario";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.json({ mensaje: "Usuario no encontrado" });
    }

    const esCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);

    if (esCorrecta) {
      const { id, nombre } = usuario;

      const data = {
        id,
        nombre,
      };

      const token = jwt.sign(data, "secreto", {
        expiresIn: 86400 /* 24hs */,
      });

      res.json({
        mensaje: "Usuario logeado correctamente",
        usuario: {
          id,
          nombre,
          token,
        },
      });
    } else {
      return res.json({ mensaje: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al intentar iniciar sesión" });
  }
};

export default login;

