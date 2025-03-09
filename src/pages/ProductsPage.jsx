import { useEffect, useState } from "react";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Add product to cart
  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5000/cart", { product_id: productId });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            <img
              src={
                product.image
                  ? `http://localhost:5000/${product.image}` // Correct URL
                  : "default-image-url" // Add a default image URL or handle the case when image is not available
              }
              alt={product.name}
              className="w-full h-32 object-cover mb-4"
            />
            <h3 className="font-bold">{product.name}</h3>
            <p>${product.price}</p>
            <button
              onClick={() => addToCart(product._id)}
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;