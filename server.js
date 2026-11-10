require('dotenv').config({ quiet: true });
const express = require('express');
const path = require('path');
const connectDB = require('./db');
const { fmtDate } = require('./utils/format');
const logger = require('./middleware/logger');
const locals = require('./middleware/locals');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.locals.fmtDate = fmtDate;                       // disponible en todas las plantillas

// Middlewares, en orden
app.use(express.static(path.join(__dirname, 'public')));   // el CSS, antes del logger, para no hacer ruido
// TODO 4. Registra logger aquí, después de express.static.
app.use(express.urlencoded({ extended: false }));   // formularios HTML → req.body
// TODO 4. Registra locals aquí para que las vistas reciban sus datos.

// Rutas
app.use('/', require('./routes/events'));

// TODO 4. Si ninguna ruta ha respondido, renderiza error.ejs con estado 404.
// Pasa a la vista status y un mensaje que indique que la página no existe.

// El middleware de errores ya está registrado al final.
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => app.listen(PORT, () => console.log(`Servidor: http://localhost:${PORT}`)))
  .catch(err => { console.error(err.message); process.exit(1); });
