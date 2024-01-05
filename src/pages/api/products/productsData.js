let products = [
    {
      id: 1,
      name: 'Lightsaber',
      category: 'StarWars',
      price: 599.99,
      
      image:'/images/lightsaber_green.jpg',
    },
    {
        id: 2,
        name: 'Pokebola',
        category: 'Electronics',
        price: 129.99,
     
        image:'/images/pokebola.png',
      },
      {
        id: 3,
        name: 'Infinity-Glove',
        category: 'MARVEL',
        price: 79.99,
       
        image :'/images/infnity_glove.jpg',
      },
      {
        id: 4,
        name: 'Mera Mera no Mi',
        category: 'ONE PIECE',
        price: 49.99,
       
        image:'/images/mera_mera_nomi.jpg'
      },
      {
        id: 5,
        name: 'Death_Note',
        category: 'the Death note',
        price: 39.99,
       
        image:'/images/death_note.jpg',
      }  
    
  ];
  
  export function getProducts() {
    return products;
  }
  
  export function getProductById(id) {
    return products.find((product) => product.id === parseInt(id));
  }
  
  export function addProduct(newProduct) {
    const lastProductId = products[products.length - 1].id;
    newProduct.id = lastProductId + 1;
    products.push(newProduct);
    return newProduct;
  }
  
  export function actualizarProducto(id, updatedProductData) {
    const productIndex = products.findIndex((product) => product.id === parseInt(id));
    if (productIndex !== -1) {
      const updatedProduct = { ...products[productIndex], ...updatedProductData };
      products[productIndex] = updatedProduct;
      console.log(products[productIndex]);
      return updatedProduct;
    }
    return null;
  }
  
  export function eliminarProducto(id) {
    const index = products.findIndex((product) => product.id === parseInt(id));


    if (index !== -1) {
      const deletedProduct = products.splice(index, 1);
      return deletedProduct[0];
    }
    return null;
  }
  