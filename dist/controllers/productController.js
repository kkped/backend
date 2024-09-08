"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
// Obtener todos los productos
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});
exports.getProducts = getProducts;
// Obtener un producto por ID
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
});
exports.getProduct = getProduct;
// Crear un nuevo producto
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, imageUrl } = req.body;
    try {
        const newProduct = new Product_1.default({ name, description, price, imageUrl });
        yield newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
});
exports.createProduct = createProduct;
// Actualizar un producto
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, imageUrl } = req.body;
    try {
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(req.params.id, { name, description, price, imageUrl }, { new: true });
        if (!updatedProduct)
            return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
});
exports.updateProduct = updateProduct;
// Eliminar un producto
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield Product_1.default.findByIdAndDelete(req.params.id);
        if (!deletedProduct)
            return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
});
exports.deleteProduct = deleteProduct;
