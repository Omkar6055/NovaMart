import React, { useState } from 'react';

const AddProduct = ({ onAddProduct, goBack }) => {
  // State for the form fields
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('electronics');
  const [image, setImage] = useState('https://i.pravatar.cc/150?u=fake@pravatar.com'); // Default dummy image

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page from reloading

    // Validation: Don't submit empty forms
    if (!title || !price) {
      alert("Please fill in all fields!");
      return;
    }

    // Create the new product object
    const newProduct = {
      id: Date.now(), // Generate a unique ID based on time
      title: title,
      price: parseFloat(price),
      category: category,
      image: image,
      rating: { rate: 5.0, count: 0 } // Default 5 stars for new items
    };

    // Send it back to App.js
    onAddProduct(newProduct);
    
    alert("Product Added Successfully!");
    goBack(); // Go back to the shop automatically
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', background: 'white' }}>
      <button onClick={goBack} style={{ marginBottom: '20px', cursor: 'pointer' }}>← Back to Shop</button>
      
      <h2>Sell a Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <input 
          type="text" 
          placeholder="Product Name (e.g. Super Watch)" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />

        <input 
          type="number" 
          placeholder="Price ($)" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />

        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>

        <input 
          type="text" 
          placeholder="Image URL (Paste a link)" 
          value={image} 
          onChange={(e) => setImage(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />

        {/* Image Preview */}
        <div style={{ textAlign: 'center' }}>
          <p>Preview:</p>
          <img src={image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
        </div>

        <button type="submit" style={{ padding: '15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer' }}>
          Publish Item
        </button>
      </form>
    </div>
  );
};

export default AddProduct;