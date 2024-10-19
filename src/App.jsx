import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Header from './components/common/Header'; // Adjust the path as necessary
import Footer from './components/common/Footer'; // Adjust the path as necessary
import UploadPage from './components/uploadpg'; // Import the new UploadPage component
import About from './components/About'; // Import the AboutPage component
import backgroundImage from './assets/homebg.png'; // Adjust the path as necessary


const App = () => {
  return (
    <Router>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`, // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          fontFamily: "'Press Start 2P', cursive",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between', // Space between header, content, and footer
          minHeight: '100vh', // Full viewport height
          textAlign: 'center', // Center text alignment
          margin: 0, // Ensure no margin around the container
          padding: '0 20px', // Add horizontal padding to prevent white lines
          overflow: 'hidden', // Hide any overflow that may cause lines
        }}
      >
        <Header />

        <Routes>
          <Route path="/" element={
            <main style={{
              flex: 1, // Allow main content to take up available space
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end', // Align items to the bottom
              padding: '20px', // Add some padding for content
            }}>
              <div style={{ marginBottom: '60px' }}> {/* Adjust margin to position the button above the footer */}
                <button
                  onClick={() => window.location.href = '/upload'} // Redirect to UploadPage
                  style={{
                    backgroundColor: '#FF5722',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '25px 25px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '20px',
                    marginTop: '20px',
                    fontFamily: "'Press Start 2P', cursive",
                    position: 'relative',
                  zIndex: 10, // Ensures the button is on top
                  }}
                >
                  Get Started
                </button>
              </div>
            </main>
          } />
          <Route path="/upload" element={<UploadPage />} /> {/* Route to UploadPage */}
          <Route path="/about" element={<About />} /> {/* Route to AboutPage */}
          <Route path="/feedback" element={<feedback/>} /> {/* Route to feedback */}
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect for unmatched routes */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

