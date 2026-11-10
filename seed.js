// Cargar datos de ejemplo en Atlas: npm run seed
// CUIDADO: antes borra todos los eventos y todas las inscripciones.
require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const connectDB = require('./db');
const Event = require('./models/Event');
const Registration = require('./models/Registration');

// Una fecha a "days" días desde hoy, a una hora concreta (siempre fechas futuras)
const at = (days, hour, minute = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d;
};

const EVENTS = [
  { title: 'Taller de Node.js: tu primera API REST', category: 'taller', capacity: 20, date: at(4, 16),
    location: 'Facultad de Informática, laboratorio 2.1 (San Sebastián)', registered: 12,
    description: 'Una pequeña API con Express paso a paso: rutas, JSON y pruebas con Thunder Client. Trae tu portátil.' },
  { title: 'Git y GitHub para principiantes', category: 'taller', capacity: 15, date: at(6, 15, 30),
    location: 'Facultad de Informática, laboratorio 0.3 (San Sebastián)', registered: 15,
    description: 'Commits, ramas y pull requests: las bases para trabajar en equipo, con ejemplos prácticos.' },
  { title: 'Inteligencia artificial y euskera: ¿dónde estamos?', category: 'charla', capacity: 120, date: at(9, 12),
    location: 'Facultad de Informática, salón de actos (San Sebastián)', registered: 47,
    description: 'Estado y retos de los modelos de lenguaje en euskera, de la mano de investigadores. Después, turno de preguntas.' },
  { title: 'Accesibilidad web: WCAG en la práctica', category: 'seminario', capacity: 60, date: at(12, 18),
    location: 'Online (el enlace se enviará a las personas inscritas)', registered: 9,
    description: 'Probar con lectores de pantalla, medir el contraste y crear formularios accesibles. Sesión práctica de dos horas.' },
  { title: 'MongoDB Atlas: bases de datos en la nube', category: 'taller', capacity: 25, date: at(15, 16),
    location: 'Facultad de Informática, laboratorio 1.2 (San Sebastián)', registered: 18,
    description: 'Crear un clúster, configurar el acceso y conectar una aplicación Node.js. Trae la cuenta de Atlas ya creada.' },
  { title: 'Hackathon de datos abiertos: transporte público de Gipuzkoa', category: 'hackathon', capacity: 40, date: at(20, 9, 30),
    location: 'Tabakalera, planta 2 (San Sebastián)', registered: 22,
    description: 'Competición de 24 horas por equipos: crear aplicaciones útiles con los datos abiertos del transporte público. Comida y cena incluidas.' },
  { title: 'Competición de ciberseguridad CTF (principiantes)', category: 'hackathon', capacity: 30, date: at(26, 10),
    location: 'Facultad de Informática, laboratorio 2.2 (San Sebastián)', registered: 6,
    description: 'Retos Capture the Flag: vulnerabilidades web, criptografía y análisis forense. No hace falta experiencia previa.' },
  { title: 'Hacia el mundo laboral: cuida tu CV y tu perfil de GitHub', category: 'seminario', capacity: 50, date: at(32, 17),
    location: 'Facultad de Informática, aula 3 (San Sebastián)', registered: 0,
    description: 'Con responsables de empresas: qué miran en un CV y cómo mostrar tus proyectos.' },
  { title: 'Sesión de bienvenida de inicio de curso', category: 'charla', capacity: 150, date: at(-20, 11),
    location: 'Facultad de Informática, salón de actos (San Sebastián)', registered: 31,
    description: 'Evento pasado: no debe aparecer en el listado.' }
];

const FIRST = ['Ane', 'Mikel', 'Irati', 'Unai', 'Maialen', 'Jon', 'Nerea', 'Iker', 'Leire', 'Asier', 'Amaia', 'Xabier',
  'June', 'Oier', 'Naroa', 'Gorka', 'Haizea', 'Ekaitz', 'Garazi', 'Aitor', 'Lorea', 'Julen', 'Maddi', 'Beñat',
  'Elene', 'Ander', 'Alaitz', 'Eneko', 'Izaro', 'Peio', 'Ainhoa', 'Kerman', 'Idoia', 'Markel', 'Saioa', 'Hodei'];
const LAST = ['Etxeberria', 'Goikoetxea', 'Zubiri', 'Arrieta', 'Agirre', 'Urrutia', 'Lasa', 'Mendizabal', 'Zabaleta',
  'Olano', 'Iriondo', 'Lizarraga', 'Ugarte', 'Larrañaga', 'Aranburu', 'Elizondo', 'Otegi', 'Aldaz', 'Mujika',
  'Beristain', 'Sarasola', 'Larrea', 'Iturbe', 'Azkue', 'Esnaola', 'Unanue', 'Ibarguren', 'Atxa', 'Saizar'];
const slug = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/g, 'n');
const person = (i, offset) => {
  const first = FIRST[(i + offset) % FIRST.length];
  const last = LAST[(i * 7 + offset) % LAST.length];
  return { name: `${first} ${last}`, email: `${slug(first)}.${slug(last)}${i}@example.com` };
};

async function seed() {
  await connectDB();
  await Promise.all([Event.deleteMany({}), Registration.deleteMany({})]);

  const events = await Event.create(EVENTS.map(({ registered, ...e }) => e));
  console.log(`${events.length} eventos creados`);

  // Si el modelo Registration está sin completar (parte 1), no se cargan las inscripciones
  if (!Registration.schema.path('email') || !Registration.schema.path('event')) {
    console.log('El modelo Registration está sin completar: no se han cargado las inscripciones. Haz la parte 1 y vuelve a ejecutarlo.');
    return;
  }
  await Registration.syncIndexes();       // asegurar que el índice único compuesto existe

  const docs = [];
  events.forEach((ev, k) => {
    for (let i = 0; i < EVENTS[k].registered; i++) docs.push({ event: ev._id, ...person(i, k * 5) });
  });
  await Registration.insertMany(docs);
  console.log(`${docs.length} inscripciones creadas`);
}

seed()
  .catch(err => { console.error('Error al cargar los datos:', err.message); process.exitCode = 1; })
  .finally(() => mongoose.disconnect());
