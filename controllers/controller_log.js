import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verificar from "./verificacionClave.js";
import connection from "../database/mySql.js";


export const login = async (req, res) => {
    const { correo, clave } = req.body;
  
    try {
      const [rows] = await connection.query("SELECT * FROM usuario WHERE correo = ?", [correo]);
  
      if (!rows || rows.length === 0) {
        return res.json({ mensaje: "Usuario no encontrado" });
      }
  
      const user = rows[0];
  
      const esCorrecta = await bcrypt.compare(clave, user.clave);
  
      if (esCorrecta) {
        const { id, nombre } = user;
  
        const data = { id, nombre };
        const token = jwt.sign(data, "secreto", {
          expiresIn: 86400 /* 24hs */,
        });
  
        res.json({
          mensaje: "Usuario logeado correctamente",
          user: {
            id,
            nombre,
            token,
          },
        });
      } else {
        return res.json({ mensaje: "Clave incorrecta" }); // Cambié "clave" a minúsculas
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al intentar iniciar sesión" });
    }
  };

// Register
export const register = async (req, res) => {
    const { nombre, correo, clave, celular } = req.body;
  
    if (!verificar(clave)) {
      return res.json({ mensaje: "La clave no cumple con los criterios de seguridad" });
    }
  
    try {
      const [existingUserRows] = await connection.query("SELECT * FROM usuario WHERE correo = ?", [correo]);
  
      if (existingUserRows && existingUserRows.length > 0) {
        return res.json({ mensaje: "Ya existe un usuario con ese correo" });
      } else if (!nombre || !correo || !clave || !celular) {
        return res.json({ mensaje: "Falta el nombre / correo / clave" });
    } else {
      const claveHasheada = await bcrypt.hash(clave, 10);

      // Insertar nuevo usuario en la base de datos
      const [result] = await connection.query(
        "INSERT INTO usuario (nombre, correo, clave, celular) VALUES (?, ?, ?, ?)",
        [nombre, correo, claveHasheada, celular]
      );

      const usuarioGuardado = {
        id: result.insertId,
        nombre,
        correo,
        celular,
      };

      res.json({ mensaje: "Usuario creado correctamente", usuario: usuarioGuardado });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al buscar el usuario por correo" });
  }
};



//getUserByid
export const getUserById = async (req, res) => {
    const { id } = req.user;

    if (id.length === 24) {
    try {
        const [rows] = await connection.query("SELECT * FROM usuario WHERE id = ?", [id]);

        if (!rows || !Array.isArray(rows) || rows.length === 0) {
            return res.json({ mensaje: "Usuario no encontrado" });
        }

        const user = rows[0];
        const { id, nombre, celular } = user;

        res.json({ id, nombre, celular });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al buscar el usuario por ID" });
    }
    } else {
    res.json({ mensaje: "ID incorrecta" });
    }
};

