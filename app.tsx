import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Cargar las variables de entorno desde .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());  

// Conexión a MongoDB Atlas
const mongoUri = process.env.MONGO_URI || '';

mongoose.connect(mongoUri)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1); 
  });

// Definir rutas y modelos aquí (CRUD)
app.get('/', (req, res) => {
  res.send('API en funcionamiento');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
