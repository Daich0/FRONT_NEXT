import React from 'react'
import { UseForm } from '@/hooks/UseForm';
import Swal from 'sweetalert2';

import Table from './Table' ;
import Image_uploader from './Image_Uploader';
import { useState } from 'react';
function form() {
   // const { setProducts } = useProducts();
    const [formValues,handleImageChange, handleInputChange, reset] = UseForm({
        name: '',
        category: '',
        price: '',
        image: '',
      });

    const [updateTrigger, setUpdateTrigger] = useState(false);
    const { name, category, price,image } = formValues;
 
  
    const postProduct = async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario
        try {
          const result = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
          });
          Swal.fire("Usuario Agregado", 'Se registró el producto correctamente', "success");
          // Resetea el formulario después de enviar los datos
          reset();
          setUpdateTrigger(prev => !prev);
          console.log('Datos del formulario  formvalues después de reset:', formValues);
        } catch (error) {
          console.error('Error al enviar el producto', error);
        }

      }
      const handleFileChange = (e) => {
        if (!e.target.files?.[0]) return;
        setFile(e.target.files?.[0]);
      };

  return (

    <div>
<section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Agregar nuevo producto</h2>
      <form  onSubmit={postProduct}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Producto</label>
                  <input type="text" name="name" id="name" value={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"   onChange={handleInputChange} required=""/>
              </div>
              <div className="w-full">
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
                  <input type="text" name="category" id="category" value={category}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"   onChange={handleInputChange} required=""/>
              </div>
              <div className="w-full">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                  <input type="number" name="price" id="price" value={price}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"   onChange={handleInputChange} required=""/>
              </div>
             
              <div className="w-full">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Imagen
              </label>
                  <Image_uploader onImageChange={handleImageChange} />
            </div>
          </div>
          <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
              Agregar producto
          </button>
      </form>
  </div>
</section>
<Table updateTrigger={updateTrigger} />
    </div>
  
  )
}

export default form