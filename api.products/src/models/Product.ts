import { Sequelize, Model, DataTypes } from 'sequelize';

interface ProductAttributes {
    ProductID: number;
    ProductName: string;
    ProductPhotoURL: string;
    ProductStatus: 'Active' | 'InActive' | null;
}

class Product extends Model<ProductAttributes> { }

export default (sequelize: Sequelize) => {
    Product.init(
        {
            ProductID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            ProductName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            ProductPhotoURL: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            ProductStatus: {
                type: DataTypes.ENUM('Active', 'InActive'),
                defaultValue: null,
            },
        },
        {
            sequelize,
            modelName: 'Product',
            tableName: 'Product',
            timestamps: false,
        }
    );

    return Product;
};
