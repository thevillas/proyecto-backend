import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
  usuario: 
  { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario' 
    },
  fecha: 
  { 
    type: Date, 
    required: true 
},
  hora: 
  { 
    type: String, 
    required: true 
},
  descripcion: 
    { 
    type: String, 
    required: true 
},
});

reservaSchema.index({ usuario: 1, fecha: 1 }, { unique: true });

export default mongoose.model('Reserva', reservaSchema);