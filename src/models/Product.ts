import mongoose, { Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
