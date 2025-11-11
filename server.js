require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ IMPORTA CORS

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

// ✅ Habilita CORS para permitir la conexión desde tu frontend
app.use(cors({
  origin: 'http://localhost:5173', // origen del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Middleware para leer JSON
app.use(express.json());

// ✅ Conexión a MongoDB
mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('✅ Conexión exitosa a MongoDB Atlas');
  })
  .catch(err => {
    console.log('❌ Error en la conexión:', err.message);
    process.exit(1);
  });

// Rutas
app.use('/api/juegos', require('./routes/juegoRoute'));
app.use('/api/resenas', require('./routes/resenaRoute'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/api/juegos`);
});
