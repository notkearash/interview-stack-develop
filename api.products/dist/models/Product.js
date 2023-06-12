"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Product.init({
        ProductID: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ProductName: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        ProductPhotoURL: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        ProductStatus: {
            type: sequelize_1.DataTypes.ENUM('Active', 'InActive'),
            defaultValue: null,
        },
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'Product',
        timestamps: false,
    });
    return Product;
};
//# sourceMappingURL=Product.js.map