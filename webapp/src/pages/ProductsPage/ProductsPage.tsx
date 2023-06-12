import React, { useEffect, useState } from "react";
import PageWrapper from '../PageWrapper';
import ProductForm from "./ProductsForm";


interface Product {
    ProductID: number;
    ProductName: string;
    ProductPhotoURL: string;
    ProductStatus: 'Active' | 'InActive' | null;
}

const ProductsPage = () => {
    /*
      TODO:
        When the drag ends we want to keep the status persistant across logins. 
        Instead of modifying the data locally we want to do it serverside via a post
        request
    */
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [showAddToCart, setShowAddToCart] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setIsMobile(screenWidth < 980);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        fetch('/api/products/')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const rows = Math.ceil(products.length / 3);

    const handleMouseEnter = (index: number) => {
        setShowAddToCart(index);
    };

    const handleMouseLeave = () => {
        setShowAddToCart(null);
    };

    const deleteHandler = async (id: number) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log(`Product ${id} deleted successfully.`);
                setProducts((prevProducts) => prevProducts.filter((product) => product.ProductID !== id));
            } else {
                console.error(`Failed to delete product ${id}.`);
            }
        } catch (error) {
            console.error(`An error occurred while deleting product ${id}.`, error);
        }
    }

    const renderRows = () => {
        const rowsToRender = [];

        for (let i = 0; i < rows; i++) {
            const startIndex = i * 3;
            const endIndex = startIndex + 3;
            const row = products.slice(startIndex, endIndex);

            rowsToRender.push(
                <div className="lg:flex lg:mb-8 sm:mb-0" key={i}>
                    {row.map((product, index) => {
                        if (product.ProductStatus === 'Active') {
                            return (
                                <div className="max-w-sm bg-white h-fit rounded shadow-lg m-8" id={product.ProductID.toString()}>

                                    <img
                                        className={`${isMobile ? 'my-0 w-full yaya' : '-mt-8 w-4/5'} cursor-pointer mx-auto rounded hover:w-full hover:my-0 transition-all`}
                                        src={product.ProductPhotoURL}
                                        alt="Sunset in the mountains"
                                        onMouseEnter={() => handleMouseEnter(startIndex + index)}
                                        onMouseLeave={handleMouseLeave}
                                    />



                                    <div className="px-6 py-4 items-center">
                                        {(showAddToCart === startIndex + index || isMobile) && (
                                            <span className="inline-block bg-gray-900 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2 w-full text-center transition-all">
                                                Click on image to add to cart
                                            </span>
                                        )}
                                        <div className="font-bold text-center text-xl mb-2">{product.ProductName}</div>
                                        <span className="hover:text-gray-200 hover:bg-gray-700 transition-all cursor-pointer inline-block bg-gray-200 rounded-lg px-3 py-3 text-lg font-semibold text-green-800 mr-2 mb-2">
                                            Active
                                        </span>
                                        <span
                                            className="hover:text-gray-200 hover:bg-gray-700 transition-all cursor-pointer inline-block bg-red-700 rounded-lg px-3 py-3 text-lg font-semibold text-red-200 mr-2 mb-2"
                                            onClick={() => deleteHandler(product.ProductID)}
                                        >
                                            Delete
                                        </span>
                                    </div>
                                    <div className="px-6 pb-2">
                                        <span className="hover:text-gray-200 hover:bg-gray-700 transition-all cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Learn more</span>
                                    </div>
                                </div>
                            )
                        }
                        else return (<></>);
                    })}
                </div>
            );
        }

        return rowsToRender;
    };

    const cards = renderRows();
    return (
        <PageWrapper>
            <ProductForm />
            <>{cards.map(opt => opt)}</>
        </PageWrapper>
    );
};

export default ProductsPage
