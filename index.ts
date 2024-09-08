import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Inicializar la aplicación de Express
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());  

// Conectar a MongoDB Atlas
const mongoURI: string = process.env.MONGO_URI || '';  

mongoose.connect(mongoURI)
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Ruta básica de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('¡Bienvenido al servidor de la tienda de rosas!');
});

// Definir las rutas de tu aplicación aquí (ejemplo de ruta para productos)
import productRoutes from './src/routes/productRoutes';
app.use('/api/products', productRoutes);  

// Puerto donde se ejecutará el servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

