import reservas from "../model/reservas";

router.post('/reserva', async (req, res) => {
  const { usuario, fecha, hora } = req.body;

  // Verificar si el usuario ya ha hecho una reserva en las últimas 12 horas
  const ultimaReserva = await Reserva.findOne({ usuario }).sort({ fecha: -1 });
  if (ultimaReserva && moment().diff(ultimaReserva.fecha, 'hours') < 12) {
    return res.status(400).json({ error: 'Solo puedes hacer una reserva cada 12 horas.' });
  }

  // Verificar si la hora ya ha sido reservada
  const reservaExistente = await Reserva.findOne({ fecha, hora });
  if (reservaExistente) {
    return res.status(400).json({ error: 'Esta hora ya ha sido reservada.' });
  }

  // Crear la nueva reserva
  const nuevaReserva = new Reserva({ usuario, fecha, hora });
  await nuevaReserva.save();

  res.json(nuevaReserva);
});

router.get('/reserva', async (req, res) => {
  const reservas = await Reserva.find();
  res.json(reservas);
});

router.put('/reserva/:id', async (req, res) => {
  const { usuario, fecha, hora } = req.body;
  const reserva = await Reserva.findByIdAndUpdate(req.params.id, { usuario, fecha, hora }, { new: true });
  res.json(reserva);
});

router.delete('/reserva/:id', async (req, res) => {
  await Reserva.findByIdAndDelete(req.params.id);
  res.json({ message: 'Reserva eliminada' });
});


export default router;