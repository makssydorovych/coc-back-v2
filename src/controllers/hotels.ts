import express from 'express';

import {createHotel, deleteHotelById, getHotelById, getHotelByTitle, getHotels} from "../db/hotels";

export const getAllHotels = async (req: express.Request, res: express.Response) => {
    try {
        const products = await getHotels();
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const getHotel = async (req: express.Request, res: express.Response) =>{
    try {
        const {id} = req.params;
        const product = await getHotelById(id);

        return res.json(product);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

}
export const deleteHotel = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        const deletedProduct = await deleteHotelById(id);

        return res.json(deletedProduct);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateHotel = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {title} = req.body;

        if (!title) {
            return res.sendStatus(400);
        }

        const product = await getHotelById(id);

        product.title = title;
        await product.save();

        return res.status(200).json(product).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const makeHotel = async (req: express.Request, res: express.Response): Promise<any> => {
    debugger;
    try {
        const {title, price, popular, description, img, type} = req.body;

        if (!title || !price) {
            return res.sendStatus(400);
        }

        const existingProduct = await getHotelByTitle(title);

        if (existingProduct) {
            return res.sendStatus(400);
        }
        const product = await createHotel({
            title,
            price,
            popular,
            description,
            img,
            type
        });

        return res.status(200).json(product).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}