import express from 'express';

import authentication from './authentication';
import users from './users';
import products from './products';
import hotels from "./hotels";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  products(router)
  hotels(router)

  return router;
};
