import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import ShoppingCart from './pages/ShoppingCart'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import MyNavbar from "./components/Navbar";
import AddProduct from './pages/AddProduct';
import ProductsPage from './pages/ProductsPage';
function App() {
  const [refresh, setRefresh] = useState(false);

  const fetchProducts = () => {
    setRefresh(!refresh); // Toggle refresh state to trigger re-render
  };
  return (


    <Router>
       <MyNavbar/>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/productspage" element={<ProductsPage/>} />
      <Route path="/shoppingcart" element={<ShoppingCart/>} />
    </Routes>
  </Router>
    
   
      
  );
}

export default App;


