import { useState } from 'react'
import { Link } from 'react-router-dom';




const Home = () => {
  

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl text-center text-blue-600 font-semibold">
        Welcome to E-Commerce Store 🛒
      </h2>
      <div className="flex justify-center mt-5">
        <Link to="/addproduct">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </Link>
        <Link to="/productspage">
          <button className="bg-green-500 text-white px-4 py-2 rounded ml-4">
            Products Page
          </button>
        </Link>
        <Link to="/shoppingcart">
          <button className="bg-red-500 text-white px-4 py-2 rounded ml-4">
            Shopping Cart
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
