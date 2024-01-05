import { addProduct } from './products/productsData';
import multer from 'multer';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const upload = multer({
  storage: multer.diskStorage({
    destination: '../../../../public/images',
    
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    upload.single('image')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Error al subir el archivo', error: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Error interno del servidor al subir el archivo', error: err.message });
      }

      const { name, category, price } = req.body;
      const imagePath = `/images/${req.file.filename}`; // Ruta de la imagen

      const newProduct = { name, category, price, image: imagePath };
      try {
        const addedProduct = await addProduct(newProduct);
        return res.status(201).json({ addedProduct });
      } catch (error) {
        return res.status(500).json({ message: 'Error al agregar un nuevo producto', error: error.message });
      }
    });
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
