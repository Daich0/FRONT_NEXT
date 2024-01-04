import React, { useState,useEffect } from 'react';
import axios from "axios";
function Navbar({ productId = 1 }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    async function fetchProductImage() {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        const product = response.data.product; // Accede al objeto del producto
        
        const image = product.image;
        
        if (image) {
          setImageSrc(image);
        } else {
          console.error('La imagen no está disponible para este producto');
        }
      } catch (error) {
        console.error('Error al obtener la imagen del producto', error);
      }
    }

    fetchProductImage();
  }, [productId]);

  return <img src={imageSrc} alt="Producto" />;
}


export default Navbar;
