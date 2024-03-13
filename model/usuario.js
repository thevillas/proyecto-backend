import mongoose from "mongoose";

const { model, Schema } = mongoose;

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  celular: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin' , 'moderador'] 
  }
});

const User = model("user", UsuarioSchema);

export default User;

