import Image from 'next/image'
import { Inter } from 'next/font/google'
import Form from '../components/Form.jsx'
import Table from '../components/Table.jsx'
import Navbar from '../components/Navbar.jsx'
import React, { useState } from 'react'; 

const inter = Inter({ subsets: ['latin'] })

export default function Home({ Component, pageProps }) {

  const [productsList, setProductsList] = useState([]); // Supongamos que aquí tienes tu lista de productos

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
    
    <Navbar/>

      <Form setProducts={setProductsList}/>
        

    </main>
  )
}
