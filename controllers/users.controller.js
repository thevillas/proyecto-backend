export const create = async(req, res)=>{
    const { nombre, correo, contraseña } = req.body;

    connection.query(
    "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)",
    [nombre, correo, contraseña],
    (error, results) => {
        if (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
        } else {
        res.json({ mensaje: "Usuario creado correctamente", usuario: results.insertId });
        }
    }
    );

}

export const getAll = async(req, res) =>{
    connection.query("SELECT * FROM usuarios", (error, results) => {
        if (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
        } else {
        res.json(results);
        }
    });
}


export const getOne = async(req, res) =>{
    const userId = req.params.id;

    connection.query("SELECT * FROM usuarios WHERE id = ?", [userId], (error, results) => {
    if (error) {
        console.error("Error al obtener usuario por ID:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    } else {
        res.json(results[0]); // Suponiendo que esperas un solo resultado
    }
    });
}


export const update = async(req, res) => {
    const userId = req.params.id;
    const { nombre, correo, contraseña } = req.body;

    try {
        connection.query(
            "UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ? WHERE id = ?",
            [nombre, correo, contraseña, userId],
            async (error, results) => {
                if (error) {
                    console.error("Error al actualizar usuario:", error);
                    res.status(500).json({ mensaje: "Error interno del servidor" });
                } else {
                    try {
                        const updateData = await User.findByIdAndUpdate(userId, req.body, {new:true});
                        res.status(200).json({msg: "User updated successfully"});
                    } catch (error) {
                        res.status(500).json({error: error});
                    }
                }
            }
        );
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}


export const deleteUser = async(req, res) =>{
    const userId = req.params.id;

    connection.query("DELETE FROM usuarios WHERE id = ?", [userId], (error, results) => {
    if (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    } else {
        res.json({ mensaje: "Usuario eliminado correctamente" });
    }
    });
}
