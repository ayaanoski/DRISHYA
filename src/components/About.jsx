import React from 'react';
import Header from './common/Header'; // Adjust the path as necessary
import Footer from './common/Footer'; // Adjust the path as necessary

const AboutPage = () => {
  return (
    <div
      style={{
        color: '#FFFFFF',
        fontFamily: "'Press Start 2P', cursive",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        textAlign: 'center',
        margin: 0,
        padding: 0,
        width: '100%',
        background: '#000000', // Solid black background
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
        <h1
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px #FF5722',
            fontWeight: 'bold',
            fontSize: '36px',
            marginBottom: '10px',
            fontFamily: "'Press Start 2P', cursive",
          }}
        >
          Drishya
        </h1>
        <p
          style={{
            maxWidth: '800px',
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#FFFFF',
          }}
        >
          Drishya is an advanced security and surveillance solution focused on real-time facial reconstruction from CCTV footage. Our technology addresses critical challenges like motion blur, occlusions, and varying lighting conditions, ensuring accurate facial reconstruction across diverse scenarios. By integrating facial recognition systems, Drishya enables real-time identification of persons of interest, enhancing security capabilities.

          <br /><br />

          Our solution offers seamless performance, from low-quality, high-motion footage to clearer environments, with optional 3D facial reconstruction for more precise identification. With an intuitive dashboard and user-friendly interface, Drishya provides continuous monitoring, alerts, and easy comparison of reconstructed images and original footage for comprehensive surveillance.
        </p>

        {/* Team Leads Section */}
        <div
          style={{
            marginTop: '30px',
            color: 'transparent',
            WebkitTextStroke: '1px #FF5722', // Transparent red color for names
            fontSize: '18px',
          }}
        >
          <p>Contributors -</p>
          <p>Ayaan Adil</p>
          <p>Anwesha Das</p>
          <p>Mandip Singh</p>
          <p>Krishna Joshi</p>
        </div>
      </main>

      <Footer style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '20px' }}>
        8 BIT
      </Footer>
    </div>
  );
};

export default AboutPage;
