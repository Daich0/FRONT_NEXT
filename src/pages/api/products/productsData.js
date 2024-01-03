let products = [
    {
      id: 1,
      name: 'Smartphone',
      category: 'Electronics',
      price: 599.99,
      description: 'A powerful smartphone with great features.',
    },
    {
        id: 2,
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 129.99,
        description: 'High-quality wireless headphones for immersive sound.',
      },
      {
        id: 3,
        name: 'Running Shoes',
        category: 'Sports & Outdoors',
        price: 79.99,
        description: 'Comfortable and durable running shoes for active users.',
      },
      {
        id: 4,
        name: 'Coffee Maker',
        category: 'Home & Kitchen',
        price: 49.99,
        description: 'An efficient coffee maker for brewing your favorite coffee.',
      },
      {
        id: 5,
        name: 'Portable Power Bank',
        category: 'Accessories',
        price: 39.99,
        description: 'A portable power bank for charging your devices on the go.',
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
  
  export function actualizarProducto(id,updatedProduct1) {
    const productToUpdate = products.find((product) => product.id === parseInt(id));
    if (productToUpdate) {
    const updatedProduct = { ...productToUpdate, ...updatedProductData };
    return updatedProduct;
    }
    return null;
  }
  
  export function deleteProduct(id) {
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1);
      return deletedProduct[0];
    }
    return null;
  }
  