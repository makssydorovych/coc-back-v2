import express from 'express';

import {createProduct, deleteProductById, getProductById, getProductByTitle, getProducts} from "../db/products";

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await getProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const getProduct = async (req: express.Request, res: express.Response) =>{
    try {
        const {id} = req.params;
        const product = await getProductById(id);

        return res.json(product);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

}
export const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        const deletedProduct = await deleteProductById(id);

        return res.json(deletedProduct);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateProduct = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {title} = req.body;

        if (!title) {
            return res.sendStatus(400);
        }

        const product = await getProductById(id);

        product.title = title;
        await product.save();

        return res.status(200).json(product).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const makeProduct = async (req: express.Request, res: express.Response): Promise<any> => {
    debugger;
    try {
        const {title, price, popular, description, img} = req.body;

        if (!title || !price) {
            return res.sendStatus(400);
        }

        const existingProduct = await getProductByTitle(title);

        if (existingProduct) {
            return res.sendStatus(400);
        }
        const product = await createProduct({
            title,
            price,
            popular,
            description,
            img,
        });

        return res.status(200).json(product).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}