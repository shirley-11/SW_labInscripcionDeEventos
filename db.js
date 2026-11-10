const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Falta MONGODB_URI en el archivo .env. Consulta la parte 0 (Atlas) del enunciado.');
  }
  await mongoose.connect(uri);
  console.log(`Conectado a MongoDB: ${mongoose.connection.host} / ${mongoose.connection.name}`);
}

module.exports = connectDB;
