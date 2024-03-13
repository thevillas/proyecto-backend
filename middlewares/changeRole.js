import User from "../model/usuario.js";

export const changeRole = async (req, res) => {
    const { id, role } = req.body;

    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ mensaje: "No tienes permiso para realizar esta acción" });
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        user.role = role;
        await user.save();

        res.status(200).json({ mensaje: "Rol actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};