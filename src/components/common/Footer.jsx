import React from 'react';
import { Link } from 'react-router-dom';
import Feedback from '../feedback'; // Adjust the path if necessary

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#000', // Black background
    color: '#fff', // White text
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: "'Press Start 2P', cursive",
    width: '100%', // Ensures full screen width
    position: 'fixed', // Sticks to the bottom of the screen
    bottom: '0',
  };

  const footerNavStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: '0',
    padding: '0',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#fff', // White color for links
    fontSize: '18px',
    transition: 'color 0.3s ease',
  };

  const linkHoverStyle = {
    color: '#999', // Light grey color on hover
  };

  return (
    <footer style={footerStyle}>
      <nav>
        <ul style={footerNavStyle}>
          <li>
            <Link
              to="/Feedback"
              style={linkStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = linkHoverStyle.color)}
              onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
            >
              Feedback
            </Link>
          </li>
          <li>
            <Link
              to="/learn-more"
              style={linkStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = linkHoverStyle.color)}
              onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
            >
              Learn More
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
