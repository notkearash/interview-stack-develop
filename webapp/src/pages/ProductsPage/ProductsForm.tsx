import React, { useState } from 'react';

const ProductForm: React.FC = () => {
    const [ProductName, setProductName] = useState('');
    const [ProductStatus, setProductStatus] = useState('InActive');
    const [image, setImage] = useState<File | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent) => {
        if (!image) {
            console.error('No image selected');
            return;
        }

        const formData = new FormData();
        formData.append('ProductName', ProductName);
        formData.append('ProductStatus', ProductStatus);
        formData.append('ProductPhotoURL', image);

        try {
            const response = await fetch('/api/products/', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Product created successfully');
                setModalOpen(false);
            } else {
                console.error('Failed to create product');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            setImage(fileList[0]);
        }
    };

    return (
        <div>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-8 mb-10"
                onClick={() => setModalOpen(true)}
            >
                Create Product
            </button>

            {modalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8 max-w-md">
                        <h2 className="text-xl font-bold mb-4">Create Product</h2>

                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Product Name:</label>
                                <input
                                    type="text"
                                    value={ProductName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="border border-gray-300 px-4 py-2 rounded w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2">Status:</label>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="Active"
                                            checked={ProductStatus === "Active"}
                                            onChange={(e) => setProductStatus(e.target.value)}
                                            className="form-radio border border-gray-300 rounded mr-2"
                                        />
                                        Active
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            type="radio"
                                            value="InActive"
                                            checked={ProductStatus === "InActive"}
                                            onChange={(e) => setProductStatus(e.target.value)}
                                            className="form-radio border border-gray-300 rounded mr-2"
                                        />
                                        InActive
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2">Image:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="border border-gray-300 px-4 py-2 rounded w-full"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Create
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductForm;
