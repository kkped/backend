import express from 'express';
import Product from '../models/Product';
import productRoutes from '../routes/productRoutes';

const router = express.Router();

// Crear un producto
router.post('/', async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    const newProduct = new Product({ name, description, price, imageUrl });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageUrl },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
});

export default router;
