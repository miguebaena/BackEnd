const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResenaSchema = new Schema({
  juego: {
    type: Schema.Types.ObjectId,
    ref: 'Juego',
    required: true
  },
  puntuacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  texto: {
    type: String,
    required: [true, 'El texto de la reseña es obligatorio']
  },
  autor: {
    type: String,
    default: 'Usuario de GameTracker'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resena', ResenaSchema);
