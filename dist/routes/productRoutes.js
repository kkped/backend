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
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
// Crear un producto
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, imageUrl } = req.body;
    try {
        const newProduct = new Product_1.default({ name, description, price, imageUrl });
        const savedProduct = yield newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
}));
// Obtener todos los productos
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
}));
// Obtener un producto por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById(req.params.id);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
}));
// Actualizar un producto
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, imageUrl } = req.body;
    try {
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(req.params.id, { name, description, price, imageUrl }, { new: true });
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
}));
// Eliminar un producto
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Producto eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
}));
exports.default = router;
