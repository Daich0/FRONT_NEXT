import { data } from "autoprefixer";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useProducts } from "@/context/productContext";
import Modal from "./Modal.jsx";

import Image from 'next/image';

function table({ updateTrigger }) {
 
  const [localProducts, setLocalProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getProducts() {
      try {
      
        const response = await axios.get('http://localhost:3000/api/products');
        setLocalProducts(response.data.products);
        
      } catch(error) {
        console.error("Error al obtener datos", error);
      }
    }

   
      getProducts();
      
    
  }, [updateTrigger]);

  const handleUpdateProduct = (updatedProduct) => {
    // Actualiza el estado local de localProducts con el producto actualizado
    const updatedProducts = localProducts.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setLocalProducts(updatedProducts);
  };

  const handleDelete = async (productId) => {
    try {
      // Realizar la solicitud DELETE al servidor para eliminar el producto por su ID
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
  
      // Actualizar localmente la lista de productos después de la eliminación
      const updatedProducts = localProducts.filter((product) => product.id !== productId);
      setLocalProducts(updatedProducts);
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };
  

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Producto
            </th>
            <th scope="col" className="px-6 py-3">
              Categoria
            </th>
            <th scope="col" className="px-6 py-3">
              Precio
            </th>
            <th scope="col" className="px-6 py-3">
              Imagen
            </th>

            <th scope="col" className="px-6 py-3">
              Editar
            </th>
            <th scope="col" className="px-6 py-3">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody>
          {localProducts.map((product,index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {product.name}
              </th>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4" > 
              <Image
                  src={product.image}
                  alt="Producto"
                  width={80} // Ancho deseado
                  height={80} // Alto deseado
                />
               </td>
              <td className="px-6 py-4">
              <button
                  
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleEdit(product)}
                >Editar</button>
              </td>
              <td className="px-6 py-4">
              <button onClick={() => handleDelete(product.id)} className="text-red-600 dark:text-red-500 hover:underline">
      Eliminar
    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal
          selectedProduct={selectedProduct}
          onClose={handleCloseModal}
          onProductUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
}

export default table;
