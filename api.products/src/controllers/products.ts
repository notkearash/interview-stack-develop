import path from 'path';
import multer from "multer";
import { Request, Response } from "express";
import { Sequelize, WhereOptions } from "sequelize";

import productModel from "../models/Product";

interface Product {
    ProductID?: number;
    ProductName: string;
    ProductPhotoURL: string;
    ProductStatus: 'Active' | 'InActive' | null;
}

export default (sequelize: Sequelize) => {
    const Product = productModel(sequelize);

    const listAllProducts = async (req: Request, res: Response) => {
        try {
            const products = await Product.findAll();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };


    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, "./static"),
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
            cb(null, uniqueName);
        }
    });

    const uploadImage = multer({ storage }).single("ProductPhotoURL");

    const createProduct = async (req: Request, res: Response): Promise<void> => {
        const productSetting = {
            ProductPhotoURL: `http://0.0.0.0:8004/${req.file.path}`,
            ProductName: req.body.ProductName,
            ProductStatus: req.body.ProductStatus,
        };
        try {
            const newProduct = await Product.create(productSetting)
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

    const deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const whereCondition: WhereOptions<Product> = { ProductID: Number(id) };
            const deletedRowCount = await Product.destroy({ where: whereCondition });
            if (deletedRowCount === 0) {
                return res.status(404).json({ message: 'Row not found' });
            }
            return res.json({ message: `Row with ID ${id} has been deleted successfully` });
        } catch (error) {
            console.error('Error deleting row:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    return {
        listAllProducts,
        uploadImage,
        createProduct,
        deleteProduct
    };
};