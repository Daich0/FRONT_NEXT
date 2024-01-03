// pages/api/products/[id].
import { getProductById, actualizarProducto, deleteProduct } from './productsData';
export default async function handler(req, res) {
    const { method,query } = req;
    const { id: productId } = query;
  switch (method) {
    case 'GET':
      try {
        // Lógica para manejar la solicitud GET para obtener un producto por ID
       
        const product = await getProductById(productId);
        console.log(productId)
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json({ product });
      } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
      }

    case 'PUT':
      try {
        // Lógica para manejar la solicitud PUT para actualizar un producto
        const { productId } = req.query;
        const updatedProductData = req.body; // Los datos actualizados del producto

        const updatedProduct = await actualizarProducto(productId, updatedProductData);
        console.log(updatedProduct);
       // console.log(productId, updatedProductData)
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }

        return res.status(200).json({ updatedProduct });
      } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
      }

    case 'DELETE':
      try {
        // Lógica para manejar la solicitud DELETE para eliminar un producto
        const { productId } = req.query;
        const deletedProduct = await deleteProduct(productId);
        
        if (!deletedProduct) {
          return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
        }

        return res.status(200).json({ message: 'Producto eliminado exitosamente' });
      } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
  }}