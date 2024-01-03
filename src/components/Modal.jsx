    import React, { useState, useEffect } from "react";
    import { useProducts } from "@/context/productContext";
    import axios from "axios";

    function Modal({ selectedProduct, onClose }) {
    const [editedProduct, setEditedProduct] = useState({ ...selectedProduct });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
        }));
    };
    
    const handleUpdateProduct = async () => {
        try {
        const response = await axios.put(
            `http://localhost:3000/api/products/${editedProduct.id}`,       
        );
        // Actualizar el estado local o realizar alguna otra acción si es necesario
        console.log("Producto actualizado:", JSON.stringify(response.data));
        onClose(); // Cerrar el modal después de editar el producto
        } catch (error) {
        console.error("Error al actualizar el producto", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Editar Producto</h2>
            <form>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-1 text-black">
                Nombre:
                </label>
                <input
                type="text"
                id="name"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                className="text-gray-500 rounded-md px-2 py-1 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block mb-1  text-black">
                Categoría:
                </label>
                <input
                type="text"
                id="category"
                name="category"
                value={editedProduct.category}
                onChange={handleInputChange}
                className="text-gray-500 rounded-md px-2 py-1 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block mb-1  text-black">
                Precio:
                </label>
                <input
                type="number"
                id="price"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                className="text-gray-500 rounded-md px-2 py-1 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block mb-1">
                Descripción:
                </label>
                <textarea
                id="description"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                className="text-gray-300 rounded-md px-2 py-1 w-full"
                rows={4}
                />
            </div>
            <div className="flex justify-end">
                <button
                type="button"
                onClick={handleUpdateProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                Guardar
                </button>
                <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 ml-2 px-4 py-2 rounded-md"
                >
                Cancelar
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    }

    export default Modal;
