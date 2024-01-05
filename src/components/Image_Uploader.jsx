 import React, { useState,useEffect } from 'react';
import axios from "axios";
import Image from "next/image";

function image_uploader({ onImageChange }) {
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      console.log(res);

      if (res.ok) {
        
        const imageURL = `/images/${file.name}`; // Ruta relativa a la carpeta 'public/images'
        setImageUrl(imageURL); // Actualiza el estado con la URL de la imagen
        onImageChange(imageURL); // Llama a la función en el padre con la URL de la imagen
        console.log('File uploaded successfully');
        console.log(imageURL);
      }
    } catch (error) {
      console.error(error);
    }
  };

   const handleFileChange = (e) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  }; 
  return (
  <div>
    <div className="flex w-96 m-4 p-4 justify-center items-center">
          <input
            type="file"
            className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
            onChange={handleFileChange}
          />

          <button
            className="bg-green-900 text-zinc-100 p-2 rounded block w-full disabled:opacity-50"
            disabled={!file}
            onClick={handleSubmit}
          >
            Upload
          </button>
        
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt="Uploaded file"
            className="w-64 h-64 object-contain mx-auto"
            width={200}
            height={200}
          />
        )}
      </div>
    </div>

  
);}




export default image_uploader

 