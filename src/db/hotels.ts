import mongoose from 'mongoose';

const HotelsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    popular: { type: Boolean, required: false },
    description: { type: String, required: false},
    img: {type: String, required: false},
    type: {type: String, required: false}

});

export const ProductModel = mongoose.model('Hotel', HotelsSchema);


export const getHotels = () => ProductModel.find();
export const getHotelByTitle = (title: string) => ProductModel.findOne({ title });
export const getProductBySessionToken = (sessionToken: string) => ProductModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getHotelById = (id: string) => ProductModel.findById(id);
export const createHotel = (values: Record<string, any>) => new ProductModel(values).save().then((product) => product.toObject());
export const deleteHotelById = (id: string) => ProductModel.findOneAndDelete({ _id: id });
export const updateProductById = (id: string, values: Record<string, any>) => ProductModel.findByIdAndUpdate(id, values);
