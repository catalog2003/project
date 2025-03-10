from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Allow frontend origin

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['ecommerce']
products_coll = db['products']
cart_coll = db['cart']

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Helper function to parse MongoDB ObjectId
def parse_product(product):
    product['_id'] = str(product['_id'])
    return product

# Add a new product
@app.route('/products', methods=['POST'])
def add_product():
    name = request.form.get('name')
    price = float(request.form.get('price'))
    image = request.files.get('image')

    if not name or not price or not image:
        return jsonify({"message": "Missing fields"}), 400

    # Save the image to the uploads folder
    image_filename = image.filename
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_filename)
    image.save(image_path)

    # Store product data in MongoDB
    product_data = {
        "name": name,
        "price": price,
        "image": image_filename  # Store only the filename
    }

    product_id = products_coll.insert_one(product_data).inserted_id
    return jsonify({"message": "Product added", "product_id": str(product_id)}), 201

# Get all products
@app.route('/products', methods=['GET'])
def get_products():
    products = list(products_coll.find())
    products = [parse_product(product) for product in products]
    return jsonify(products), 200

# Delete a product
@app.route('/products/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    result = products_coll.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count:
        return jsonify({"message": "Product deleted"}), 200
    else:
        return jsonify({"message": "Product not found"}), 404

# Serve uploaded images

# Add product to cart
@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.json
    product = products_coll.find_one({"_id": ObjectId(data["product_id"])})

    cart_coll.insert_one({
        "product_id": str(data["product_id"]),
        "name": product["name"],
        "price": product["price"],
        "image": product.get("image", "")
    })
    return jsonify({"message": "Product added to cart"}), 201

# Get cart items
@app.route('/cart', methods=['GET'])
def get_cart():
    cart_items = list(cart_coll.find())
    for item in cart_items:
        item["_id"] = str(item["_id"])
    return jsonify(cart_items), 200

# Delete cart item
@app.route('/cart/<item_id>', methods=['DELETE'])
def delete_cart_item(item_id):
    result = cart_coll.delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count:
        return jsonify({"message": "Item deleted"}), 200
    else:
        return jsonify({"message": "Item not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)