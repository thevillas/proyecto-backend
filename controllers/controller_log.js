import User from "../model/usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verificar from "./verificacionClave.js";
import { generateToken } from "../middlewares/verifyToken.js";




export const login = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const user = await User.findOne({ correo });

        if (!user) {
            return res.json({ mensaje: "user no encontrado" });
        }

        const esCorrecta = await bcrypt.compare(contraseña, user.contraseña);

        if (esCorrecta) {
            const { id, nombre } = user;

            const data = {
                id,
                nombre,
            };

            
            const token = generateToken(data);

            
            res.cookie('token', token, { httpOnly: true });

            res.json({
                mensaje: "user logeado correctamente",
                user: {
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






//register
export const register = async (req, res) => {
    const { nombre, correo, contraseña, celular } = req.body;

    if (!verificar(contraseña)) {
        return res.json({ mensaje: "La contraseña no cumple con los criterios de seguridad" });
    }

    try {
        const existingUser = await User.findOne({ correo });

        if (existingUser) {
            return res.json({ mensaje: "Ya existe un usuario con ese correo" });
        } else if (!nombre || !correo || !contraseña || !celular) {
            return res.json({ mensaje: "Falta el nombre / correo / contraseña" });
        } else {
            bcrypt.hash(contraseña, 10, async (error, contraseñaHasheada) => {
                if (error) {
                    return res.json({ error });
                } else {
                    
                    const nuevoUsuario = new User({
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





//getUserByid
export const getUserById = async (req, res) => {
    const { id } = req.user;

    if (id.length === 24) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.json({
                    mensaje: "No se encontró ningún user con esa ID",
                });
            } else {
                const { _id, contraseña, __v, ...resto } = user._doc;
                res.json(resto);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: "Error al buscar el user por ID" });
        }
    } else {
        res.json({ mensaje: "Contraseña incorrecta" });
    }
};

export const logout = (req, res) => {
    // Eliminar la cookie
    res.clearCookie('token');
    res.json({ mensaje: "Has cerrado sesión correctamente" });
  };