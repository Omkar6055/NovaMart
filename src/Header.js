import React from 'react';

const Header = ({ count, setSearchTerm }) => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <h1 style={{ fontSize: '1.5rem', margin: 0, cursor:'pointer'}}>NovaMart</h1>


      {/* Cart & Account */}
      <div style={{ color: 'white', cursor: 'pointer' }}>
        <div style={{ fontSize: '12px' }}>Hello, Customer</div>
        <div style={{ fontWeight: 'bold' }}>Account & Lists</div>
      </div>

      <div className="cart-btn">
        🛒 {count}
      </div>
    </nav>
  );
};

export default Header;