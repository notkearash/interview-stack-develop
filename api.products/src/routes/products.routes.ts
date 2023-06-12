import productsController from '../controllers/products';
import express, { Router, Request, Response } from "express";
import { Sequelize } from 'sequelize';

const router: Router = express.Router();
export default (sequelize: Sequelize) => {
    router.get('/', productsController(sequelize).listAllProducts);
    router.post('/', productsController(sequelize).uploadImage, productsController(sequelize).createProduct);
    router.delete('/:id', productsController(sequelize).deleteProduct)
    return router;
}
