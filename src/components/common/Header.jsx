import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 40px',
        width: '100%', // Ensure the header covers the full screen width
        position: 'fixed', // Keeps the header fixed at the top
        top: 0,
        left: 0,
        zIndex: 1000, // Ensures the header stays on top of other content
      }}
    >
      <div
        style={{
          fontSize: '28px', // Increased font size for "DRISHYA" to make it stand out
          fontFamily: "'Press Start 2P', cursive",
          marginRight: 'auto',
        }}
      >
        DRISHYA
      </div>
      <nav style={{ marginLeft: 'auto', textAlign: 'center' }}>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'flex-end', // Aligns the links to the right
            gap: '40px', // Adjusted gap for better spacing
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link
              to="/" // Navigates to the Home page
              style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '16px', // Font size for menu items
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#999')}
              onMouseLeave={(e) => (e.target.style.color = '#fff')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about" // Navigates to the About Us page
              style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '16px', // Font size for menu items
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#999')}
              onMouseLeave={(e) => (e.target.style.color = '#fff')}
            >
              About Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
