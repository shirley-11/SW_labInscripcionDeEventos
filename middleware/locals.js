// Parte 4: poner en res.locals los datos que necesitan TODAS las plantillas:
//   siteName:    'Eventos · Facultad de Informática'
//   year:        el año actual (en el pie de página)
//   currentPath: req.path (para resaltar la página activa en la navegación)
// Lo que hay en res.locals llega automáticamente a la plantilla que pinta res.render().
module.exports = (req, res, next) => {
  // TODO 4. Guarda siteName, year y currentPath en res.locals.
  next();
};
