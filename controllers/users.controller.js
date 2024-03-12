import User from '../models/User.js'; 

export const create = async(req, res) => {
    const { nombre, correo, contraseña } = req.body;

    try {
        const newUser = new User({ nombre, correo, contraseña });
        const savedUser = await newUser.save();

        res.json({ mensaje: "Usuario creado correctamente", usuario: savedUser._id });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}

export const getAll = async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}

export const getOne = async(req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        res.json(user);
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}

export const update = async(req, res) => {
    const userId = req.params.id;
    const { nombre, correo, contraseña } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { nombre, correo, contraseña }, { new: true });
        res.status(200).json({msg: "User updated successfully", user: updatedUser});
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}

export const deleteUser = async(req, res) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId);
        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}
