import { useEffect, useState } from "react";
import axios from "axios";

const ShoppingCart = () => {
 
  const [cart, setCart] = useState([]);


 

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

 

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${itemId}`);
      alert("Item removed from cart!");
      fetchCart(); // Refresh cart
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  useEffect(() => {
   
    fetchCart();
  }, []);

  return (
    <div className="container mx-auto p-4">
     

      {/* Cart Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default ShoppingCart;