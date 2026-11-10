const router = require('express').Router();
const mongoose = require('mongoose');
const { validationResult, matchedData } = require('express-validator');
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const { registration } = require('../validations/registrationValidations');

// ---- Funciones auxiliares --------

// Busca el evento por su ID. Devuelve null si el ID tiene un formato
// inválido o si el evento no existe en la base de datos.
async function findEvent(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  return Event.findById(id);
}

// Carga las inscripciones por orden de llegada y calcula las plazas libres.
// options permite pasar mensajes y datos del formulario a la vista.
// status es el código HTTP de la respuesta. Por defecto, es 200.
async function renderEventPage(res, event, options = {}, status = 200) {
  const registrations = await Registration.find({ event: event._id })
    .sort({ createdAt: 1 });

  const free = event.capacity - registrations.length;

  res.status(status).render('event', {
    event,
    registrations,
    free,
    errors: options.errors || {},
    old: options.old || {},
    registered: options.registered || false
  });
}

// ---- TODO: Parte 2 -----------------------------------------------------------------

// GET /events — próximos eventos, ordenados por fecha, con sus plazas libres.
router.get(['/', '/events'], async (req, res, next) => {
  try {
    // Fija el límite a las 00:00 para incluir todos los eventos de hoy.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // TODO 1. Sustituye [] por el resultado de la consulta a Event.
    // Filtra por fecha con $gte y ordena por fecha ascendente con sort().
    const events = [];

    // Espera a que estén preparados los datos de todas las tarjetas.
    const eventsWithAvailability = await Promise.all(
      events.map(async (event) => {
        // TODO 2. Sustituye el 0 por el recuento de inscripciones de este evento.
        // Usa Registration.countDocuments con un filtro para el evento actual.
        const registrations = 0;

        return {
          _id: event._id,
          title: event.title,
          date: event.date,
          location: event.location,
          category: event.category,
          capacity: event.capacity,
          free: event.capacity - registrations
        };
      })
    );

    res.render('index', { events: eventsWithAvailability });
  } catch (err) {
    next(err);
  }
});

// GET /events/:id — detalle de un evento.
router.get('/events/:id', async (req, res, next) => {
  try {
    // TODO 2.2. Lee el ID en req.params.id y busca el evento con findEvent.
    // Si findEvent devuelve null, llama a next() y termina el controlador.
    // Si encuentras el evento, muestra el detalle con renderEventPage.
    // En el paso 2 del 3.2 añadirás la confirmación tras la inscripción.

    // Mientras la ruta esté incompleta, todas las peticiones reciben un 404.
    // Sustituye esta línea por la lógica descrita arriba.
    return next();
  } catch (err) {
    next(err);
  }
});

// -------------- Parte 3 -----------------

// POST /events/:id/registrations
router.post('/events/:id/registrations', registration, async (req, res, next) => {
  try {
    // TODO 3.2, paso 1. Busca el evento como en el 2.2.
    // Si no existe, llama a next() y termina el controlador.

    // TODO 3.2, paso 1. Recoge los errores con validationResult(req).
    // Si los hay, vuelve al detalle con errors, old y un 400.
    // Prepara old con los valores enviados en req.body.

    // TODO 3.2, paso 3. Comprueba si el evento ya ha comenzado o está completo.
    // Si es así, vuelve al detalle con errors.general, old y un 409.

    // TODO 3.2, paso 2. Recupera los campos validados con matchedData(req)
    // y guarda la inscripción asociada al evento.
    // TODO 3.2, paso 3. Si el guardado devuelve E11000, vuelve al detalle con errors.email,
    // old y un 409. Gestiona el duplicado donde tengas acceso al evento y a old.

    // TODO 3.2, paso 2. Tras guardar, redirige con 303 al detalle con ?registered=1.

    // Sustituye esta respuesta provisional al completar la ruta.
    return res.status(501).render('error', {
      status: 501,
      message: 'Inscripción pendiente de implementar'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
