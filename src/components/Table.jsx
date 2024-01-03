import { data } from "autoprefixer";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useProducts } from "@/context/productContext";
import Modal from "./Modal.jsx";
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

  const handleDelete = (indexToDelete) => {
    const updatedProducts = localProducts.filter((_, index) => index !== indexToDelete);
    setLocalProducts(updatedProducts);
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
              Descripcion
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
              <td className="px-6 py-4" >{product.description}</td>
              <td className="px-6 py-4">
              <button
                  
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleEdit(product)}
                >Editar</button>
              </td>
              <td className="px-6 py-4">
              <button onClick={() => handleDelete(index)} className="text-red-600 dark:text-red-500 hover:underline">
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
          // Any additional props needed
        />
      )}
    </div>
  );
}

export default table;