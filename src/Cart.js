import React from 'react';

const Cart = ({ cartItems, goBack, increaseQty, decreaseQty, removeFromCart }) => {
  // Calculate total: Price * Quantity for each item
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={goBack} style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer' }}>
        ← Back to Shop
      </button>
      
      <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Your Amazon cart is empty.</p>
      ) : (
        <div>
           {cartItems.map((item) => (
             <div key={item.id} style={{ 
                borderBottom: '1px solid #eee', 
                padding: '20px 0', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
             }}>
               
               {/* Left: Image & Title */}
               <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                 <img src={item.image} alt={item.title} style={{ width: '80px', objectFit: 'contain' }} />
                 <div>
                   <h4>{item.title}</h4>
                   <p style={{ color: '#007600', fontSize: '12px' }}>In Stock</p>
                   <p style={{ fontWeight: 'bold' }}>${item.price}</p>
                 </div>
               </div>

               {/* Right: Controls (+ - Remove) */}
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 
                 {/* Quantity Controls */}
                 <div style={{ background: '#f0f2f2', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '5px' }}>
                    <button 
                      onClick={() => decreaseQty(item.id)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '0 10px' }}
                    >−</button>
                    
                    <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
                    
                    <button 
                      onClick={() => increaseQty(item.id)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '0 10px' }}
                    >+</button>
                 </div>

                 {/* Delete Button */}
                 <button 
                   onClick={() => removeFromCart(item.id)}
                   style={{ background: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontSize: '12px' }}
                 >
                   Delete
                 </button>
               </div>
             </div>
           ))}
           
           {/* The Grand Total */}
           <div style={{ marginTop: '30px', textAlign: 'right', fontSize: '1.5rem' }}>
             Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items): 
             <strong style={{ marginLeft: '10px' }}>${total.toFixed(2)}</strong>
           </div>
           
           <button style={{ width: '100%', padding: '15px', background: '#ffd814', border: 'none', borderRadius: '8px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
             Proceed to Checkout
           </button>
        </div>
      )}
    </div>
  );
};

export default Cart;