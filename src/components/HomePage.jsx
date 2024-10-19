import React from 'react';
import Header from './common/Header'; // Adjust the path as necessary
import Footer from './common/Footer'; // Adjust the path as necessary

const HomePage = () => {
  return (
    <div
      style={{
        backgroundColor: '#121212',
        color: '#FFFFFF',
        fontFamily: "'Press Start 2P', cursive",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        textAlign: 'center',
        margin: 0,
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <h1 style={{ paddingBottom: 20 }}>Welcome to Home Page</h1>
        <p style={{ maxWidth: '600px', marginBottom: '20px' }}>
          We develop advanced security solutions specializing in real-time facial reconstruction from CCTV footage. Our technology enhances surveillance systems by addressing challenges like motion blur, occlusions, and varying lighting conditions, with seamless integration of facial recognition and real-time monitoring capabilities.
        </p>
        
        <div
          style={{
            backgroundColor: 'red',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0',
          }}
        >
          <button
            style={{
              fontFamily: "'Press Start 2P', cursive",
              color: '#FFFFFF',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '10px 20px',
              textDecoration: 'underline',
            }}
          >
            Get Started
          </button>
        </div>
      </main>

      <Footer text="8-bit" /> {/* Assuming the Footer component can accept a text prop */}
    </div>
  );
};

export default HomePage;
