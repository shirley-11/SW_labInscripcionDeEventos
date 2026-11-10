// Parte 4: errores que llegan mediante next(err).
//   - status = err.status o 500
//   - si es 500, console.error(err) y mensaje genérico (no mostrar detalles internos)
//   - res.status(status).render('error', { status, message })
module.exports = (err, req, res, next) => {
  // TODO 4. Sustituye la respuesta provisional por la vista de error.
  // Registra el detalle en consola solo si el estado es 500 y muestra un mensaje genérico.
  console.error(err);
  res.status(err.status || 500).send('Error');
};
