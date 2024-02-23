import Usuario from "../model/usuario";

const getUserById = async (req, res) => {
  const { id } = req.user;

  if (id.length === 24) {
    try {
      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return res.json({
          mensaje: "No se encontró ningún usuario con esa ID",
        });
      } else {
        const { _id, contraseña, __v, ...resto } = usuario._doc;
        res.json(resto);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al buscar el usuario por ID" });
    }
  } else {
    res.json({ mensaje: "Contraseña incorrecta" });
  }
};

export default getUserById;

