import bcrypt from "bcrypt";
import Usuario from "../model/usuario";

const register = async (req, res) => {
  const { nombre, correo, contraseña, celular } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (usuario) {
      return res.json({ mensaje: "Ya existe un usuario con ese correo" });
    } else if (!nombre || !correo || !contraseña || !celular) {
      return res.json({ mensaje: "Falta el nombre / correo / contraseña" });
    } else {
      bcrypt.hash(contraseña, 10, async (error, contraseñaHasheada) => {
        if (error) {
          return res.json({ error });
        } else {
          const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contraseña: contraseñaHasheada,
            celular,
          });

          try {
            const usuarioGuardado = await nuevoUsuario.save();
            res.json({ mensaje: "Usuario creado correctamente", usuario: usuarioGuardado });
          } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: "Error al guardar el nuevo usuario" });
          }
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al buscar el usuario por correo" });
  }
};

export default register;

