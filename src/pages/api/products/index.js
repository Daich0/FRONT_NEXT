import { getProducts, addProduct } from './productsData';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await getProducts();
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
  } else if (req.method === 'POST') {
    const newProductData = req.body; // Asegúrate de parsear o manejar los datos correctamente
    
    try {
      const newProduct = await addProduct(newProductData);
      return res.status(201).json({ newProduct });
    } catch (error) {
      return res.status(500).json({ message: 'Error al agregar un nuevo producto', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
