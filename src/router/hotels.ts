import express from 'express';
import {deleteHotel, getAllHotels, getHotel, makeHotel, updateHotel} from "../controllers/hotels";
// import {isAuthenticated} from "../middlewares";


export default (router: express.Router) => {
    router.get('/hotels',  getAllHotels);
    router.get('/hotels/:id', getHotel)
    router.delete('/hotels/:id', deleteHotel);
    router.patch('/hotels/:id', updateHotel);
    router.post('/hotels', makeHotel);
};