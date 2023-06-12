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
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const Product_1 = __importDefault(require("../models/Product"));
exports.default = (sequelize) => {
    const Product = (0, Product_1.default)(sequelize);
    const listAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield Product.findAll();
            res.json(products);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => cb(null, "./static"),
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path_1.default.extname(file.originalname)}`;
            cb(null, uniqueName);
        }
    });
    const uploadImage = (0, multer_1.default)({ storage }).single("ProductPhotoURL");
    const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const productSetting = {
            ProductPhotoURL: `http://0.0.0.0:8004/${req.file.path}`,
            ProductName: req.body.ProductName,
            ProductStatus: req.body.ProductStatus,
        };
        try {
            const newProduct = yield Product.create(productSetting);
            res.status(201).json(newProduct);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    });
    const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const whereCondition = { ProductID: Number(id) };
            const deletedRowCount = yield Product.destroy({ where: whereCondition });
            if (deletedRowCount === 0) {
                return res.status(404).json({ message: 'Row not found' });
            }
            return res.json({ message: `Row with ID ${id} has been deleted successfully` });
        }
        catch (error) {
            console.error('Error deleting row:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
    return {
        listAllProducts,
        uploadImage,
        createProduct,
        deleteProduct
    };
};
//# sourceMappingURL=products.js.map