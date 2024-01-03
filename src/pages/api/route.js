import { NextResponse } from "next/server";
//Traer todos los productos
export const GET = async () => {    
    const result = await fetch('http://localhost:3000/api/products',{        
        headers: {
            "Content-type": "application/json"
        }
    })
    const products =  await result.json()
    return NextResponse.json({data:products})
};
//Crear un producto
/* export const POST = async (req)=>{
    const product = await req.json()
    console.log(product);
    const result = await fetch(process.env.API_URL, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",      
        },
        body: JSON.stringify(product)
    })
    const newProduct = await result.json()
    return NextResponse.json({data: newProduct})
} */