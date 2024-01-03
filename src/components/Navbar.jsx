import React, { useState } from 'react';

function Navbar() {
  const [data, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await getData();
      setData(response.data); // Cambiado a setData(response.data)
    } catch (error) {
      console.error('Error al obtener datos', error);
    }
  };

  const getData = async () => {    
    const result = await fetch('http://localhost:3000/api/products',{        
      headers: {
        "Content-type": "application/json"
      }
    });
    const products = await result.json();

    return { data: products }; // Devuelve directamente el objeto products
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <div>{JSON.stringify(data)}</div> {/* Muestra los datos como string */}
        <button type="submit">Obtener Datos</button>
      </form>
    </div>
  );
}

export default Navbar;
