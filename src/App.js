import React, { useState, useEffect } from 'react';
import './style.css';
import Header from './Header';
import Cart from './Cart';
import AddProduct from './AddProduct'; // 1. Import the new file

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // 2. NEW VIEW: We now have 'home', 'cart', and 'add-product'
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "men's clothing", "women's clothing", "electronics", "jewelery"];

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const itemExists = cart.find((item) => item.id === product.id);
    if (itemExists) {
      setCart(cart.map((item) => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert("Added to cart!");
  };

  const increaseQty = (id) => {
    setCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQty = (id) => {
    setCart(cart.map((item) => {
      if (item.id === id) return { ...item, quantity: Math.max(1, item.quantity - 1) };
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // 3. NEW FUNCTION: Add a custom product to the TOP of the list
  const addNewProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 4. VIEW LOGIC: Decide which page to show
  const renderView = () => {
    if (currentView === 'cart') {
      return (
        <Cart 
          cartItems={cart} 
          goBack={() => setCurrentView('home')}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeFromCart={removeFromCart}
        />
      );
    }
    
    if (currentView === 'add-product') {
      return (
        <AddProduct 
          onAddProduct={addNewProduct} 
          goBack={() => setCurrentView('home')} 
        />
      );
    }

    // Default: Home Page
    return (
      <div>
        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'capitalize',
                background: selectedCategory === cat ? '#232f3e' : '#e0e0e0',
                color: selectedCategory === cat ? 'white' : 'black'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sell Button */}
        <div className="search-container" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="🔍 Search Product..." 
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* THE NEW BUTTON */}
          <button 
            onClick={() => setCurrentView('add-product')}
            style={{ padding: '10px 20px', background: '#ffa41c', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}
          >
             Sell Item
          </button>
        </div>
        
        <div className="product-grid">
          {products
            .filter((product) => {
              const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
              return matchesSearch && matchesCategory;
            })
            .map((product) => (
              <div key={product.id} className="card">
                <img src={product.image} alt={product.title} />
                <h4>{product.title.substring(0, 20)}...</h4>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: '#f0c14b', marginRight: '5px' }}>
                    {'★'.repeat(Math.round(product.rating.rate))} 
                    {'☆'.repeat(5 - Math.round(product.rating.rate))}
                  </span>
                  <span style={{ fontSize: '12px', color: '#555' }}>
                    ({product.rating.count})
                  </span>
                </div>
                <p style={{ color: '#b12704', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  INR {product.price}
                </p>
                <button className="btn-primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div onClick={() => setCurrentView('cart')}>
        <Header count={totalItems} />
      </div>
      {renderView()}
    </div>
  );
}