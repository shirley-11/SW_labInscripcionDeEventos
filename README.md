# Eventos · Laboratorio (proyecto de partida)

Web de inscripción en los eventos de la Facultad de Informática (talleres, charlas, seminarios, hackatones):
**EJS + Mongoose + MongoDB Atlas + middlewares**. Enunciado completo y evaluación: en el documento que ha entregado el profesor.

## Arrancar

```bash
npm install
cp .env.example .env     # poner MONGODB_URI (Atlas, parte 0)
npm run seed             # cargar los eventos de ejemplo en Atlas
npm run dev              # http://localhost:3000
```

## Qué viene hecho

- `server.js`: Express, EJS, `express.static`, `express.urlencoded` y las rutas
- `models/Event.js`, `seed.js`, `utils/format.js` (`fmtDate`), `public/style.css`
- `views/`: el HTML de todas las páginas, `partials/` (cabecera y pie) y `error.ejs`
- `routes/events.js`: las funciones auxiliares `findEvent` y `renderEventPage`

## Qué tienes que hacer (busca `TODO`)

| Parte | Archivos |
|---|---|
| 0. Atlas | `.env` |
| 1. Modelo | `models/Registration.js` |
| 2. Listado y detalle | `routes/events.js` (rutas GET), `views/index.ejs`, `views/event.ejs` (lista de nombres) |
| 3. Inscripción | `validations/registrationValidations.js`, `routes/events.js` (POST), `views/event.ejs` (errores) |
| 4. Middlewares | `middleware/logger.js`, `middleware/locals.js`, `middleware/errorHandler.js`, `server.js` |

No subas el archivo `.env`: contiene el usuario y la contraseña de Atlas.
