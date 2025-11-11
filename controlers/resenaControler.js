const Resena = require('../models/Resena');

// Crear reseña (POST)
exports.crearResena = async (req, res) => {
  try {
    const nuevaResena = new Resena(req.body);
    await nuevaResena.save();
    res.status(201).json(nuevaResena);
  } catch (error) {
    res.status(400).json({
      error: 'Error al agregar reseña. Verifique los campos.',
      details: error.message
    });
  }
};

// Obtener todas las reseñas (GET)
exports.obtenerResenas = async (req, res) => {
  try {
    const filtro = req.query.juegoId ? { juego: req.query.juegoId } : {};
    const resenas = await Resena.find(filtro).populate('juego', 'nombre');
    res.status(200).json(resenas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reseñas', details: error.message });
  }
};

// Obtener reseña por ID (GET /:id)
exports.obtenerResenaPorId = async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id).populate('juego', 'nombre');
    if (!resena) {
      return res.status(404).json({ msj: 'Reseña no encontrada' });
    }
    res.status(200).json(resena);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar reseña', details: error.message });
  }
};

// Actualizar reseña (PUT /:id)
exports.actualizarResena = async (req, res) => {
  try {
    const resena = await Resena.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!resena) {
      return res.status(404).json({ msj: 'Reseña no encontrada' });
    }

    res.status(200).json(resena);
  } catch (error) {
    res.status(400).json({
      error: 'Error al actualizar reseña',
      details: error.message
    });
  }
};

// Eliminar reseña (DELETE /:id)
exports.eliminarResena = async (req, res) => {
  try {
    const resena = await Resena.findByIdAndDelete(req.params.id);
    if (!resena) {
      return res.status(404).json({ msj: 'Reseña no encontrada para eliminar' });
    }
    res.status(200).json({ msj: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar reseña', details: error.message });
  }
};
