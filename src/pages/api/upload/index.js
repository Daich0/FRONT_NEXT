import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de Multer
const upload = multer({
  dest: 'public/images', // Directorio donde se guardarán los archivos
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Función para manejar la solicitud POST con Multer
export default function handler(req, res) {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      res.status(500).json({ success: false, error: err });
      return;
    }
    try {
      const oldPath = req.file.path;
      const newPath = path.join('public/images', req.file.originalname);

      // Mueve el archivo a la ubicación deseada
      fs.rename(oldPath, newPath, (error) => {
        if (error) {
          res.status(500).json({ success: false, error });
          return;
        }
        res.status(200).json({ success: true, message: 'File uploaded successfully' });
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
}
