"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("../controllers/products"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = (sequelize) => {
    router.get('/', (0, products_1.default)(sequelize).listAllProducts);
    router.post('/', (0, products_1.default)(sequelize).uploadImage, (0, products_1.default)(sequelize).createProduct);
    router.delete('/:id', (0, products_1.default)(sequelize).deleteProduct);
    return router;
};
//# sourceMappingURL=products.routes.js.map