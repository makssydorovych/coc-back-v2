import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    popular: { type: Boolean, required: false },
    description: { type: String, required: false},
    img: {type: String, required: false},

});

export const ProductModel = mongoose.model('Product', ProductsSchema);


export const getProducts = () => ProductModel.find();
export const getProductByTitle = (title: string) => ProductModel.findOne({ title });
export const getProductBySessionToken = (sessionToken: string) => ProductModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getProductById = (id: string) => ProductModel.findById(id);
export const createProduct = (values: Record<string, any>) => new ProductModel(values).save().then((product) => product.toObject());
export const deleteProductById = (id: string) => ProductModel.findOneAndDelete({ _id: id });
export const updateProductById = (id: string, values: Record<string, any>) => ProductModel.findByIdAndUpdate(id, values);
