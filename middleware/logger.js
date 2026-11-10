// Parte 4: middleware a nivel de aplicación.
// Puedes reutilizar el del ejercicio de middlewares:  GET /events/6650… 200 18 ms
module.exports = (req, res, next) => {
  // TODO 4. Reutiliza el logger del ejercicio de clase.
  // Al terminar la respuesta, registra método, URL, estado y tiempo.
  next();
};
