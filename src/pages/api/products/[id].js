// pages/api/products/[id].
import { getProductById, actualizarProducto, eliminarProducto } from './productsData';
export default async function handler(req, res) {
    const { method,query } = req;
    const { id: productId } = query;
  switch (method) {
    case 'GET':
      try {
        // Lógica para manejar la solicitud GET para obtener un producto por ID
       
        const product = await getProductById(productId);
       
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
       
        const updatedProductData = req.body; // Los datos actualizados del producto

        const updatedProduct = await actualizarProducto(productId, updatedProductData);
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
       
        const deletedProduct = await eliminarProducto(productId);
        console.log(productId)
        console.log("helooo  " + JSON.stringify(deletedProduct));
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