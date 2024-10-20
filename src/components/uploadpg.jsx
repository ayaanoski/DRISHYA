import React, { useRef, useState } from 'react';
import axios from 'axios';
import Header from './common/Header'; // Adjust the path as necessary
import Footer from './common/Footer'; // Adjust the path as necessary

const UploadPage = () => {
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null); // Reference for the media stream
  const [isCameraActive, setIsCameraActive] = useState(false); 
  const [videoFile, setVideoFile] = useState(null);
  const [faceFile, setFaceFile] = useState(null);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [detectedFaceImages, setDetectedFaceImages] = useState([]); // New state for detected images
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleVideoUpload = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleFaceUpload = (event) => {
    setFaceFile(event.target.files[0]);
  };

  const handleTryRealTime = async () => {
    try {
      // Request access to the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaStreamRef.current = stream; // Store the stream for later use
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Set the video element's source to the camera stream
        videoRef.current.play(); // Start playing the video stream
        setIsCameraActive(true); // Set camera status to active
      }
    } catch (err) {
      console.error('Error accessing the camera:', err);
    }
  };

  const handleTerminate = () => {
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getTracks(); // Get all tracks from the media stream
      tracks.forEach((track) => track.stop()); // Stop each track
      mediaStreamRef.current = null; // Clear the reference to the stream
      if (videoRef.current) {
        videoRef.current.srcObject = null; // Clear the video source
      }
      setIsCameraActive(false); // Set camera status to inactive
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !faceFile) {
      alert('Please upload both a video and a face image.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('face', faceFile);

    try {
      setIsLoading(true); // Set loading to true when the upload starts
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDetectedFaces(response.data.detected_faces);
      setDetectedFaceImages(response.data.detected_face_images); // Store detected images
    } catch (error) {
      console.error('Error uploading files:', error.response?.data || error.message);
      alert('Error uploading files');
    } finally {
      setIsLoading(false); // Set loading to false after the upload finishes
    }
  };

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
        background: '#000000',
        opacity: isLoading ? 0.5 : 1, // Reduce opacity when loading
        pointerEvents: isLoading ? 'none' : 'auto', // Prevent interactions when loading
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
            fontSize: '56px',
            marginBottom: '40px',
            marginTop: '60px',
            fontFamily: "'Press Start 2P', cursive",
          }}
        >
          READY TO INVESTIGATE?
        </h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '1000px',
            marginBottom: '20px',
            marginTop: '20px',
          }}
        >
          {/* Box 1: Upload Footage */}
          <div
            style={{
              backgroundColor: '#FF5722',
              color: '#FFFFFF',
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center',
              width: '250px',
              margin: '10px',
            }}
          >
            <h3 style={{ fontSize: '16px' }}>Upload Footage</h3>
            <input 
              type="file" 
              accept="video/*" 
              onChange={handleVideoUpload} 
              style={{ display: 'none' }} // Hide the default input
              id="videoUpload"
            />
            <label htmlFor="videoUpload" 
              style={{
                backgroundColor: '#FFFFFF',
                color: '#FF5722',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Press Start 2P', cursive",
                marginTop: '10px',
                display: 'inline-block',
              }}
            >
              Choose Video
            </label>
          </div>

          {/* Box 2: Upload a Face */}
          <div
            style={{
              backgroundColor: '#FF5722',
              color: '#FFFFFF',
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center',
              width: '250px',
              margin: '10px',
            }}
          >
            <h3 style={{ fontSize: '16px' }}>Upload a Face</h3>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFaceUpload} 
              style={{ display: 'none' }} // Hide the default input
              id="faceUpload"
            />
            <label htmlFor="faceUpload" 
              style={{
                backgroundColor: '#FFFFFF',
                color: '#FF5722',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Press Start 2P', cursive",
                marginTop: '10px',
                display: 'inline-block',
              }}
            >
              Choose Face
            </label>
          </div>

          {/* Box 3: Try Real Time */}
          <div
            style={{
              backgroundColor: '#FF5722',
              color: '#FFFFFF',
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center',
              width: '250px',
              margin: '10px',
            }}
          >
            <h3 style={{ fontSize: '16px' }}>Try Real Time</h3>
            <button
              onClick={handleTryRealTime}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#FF5722',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Press Start 2P', cursive",
              }}
            >
              Try Now
            </button>
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#FF5722',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: "'Press Start 2P', cursive",
            marginTop: '20px',
          }}
        >
          Upload
        </button>
        
        {/* Display detected faces */}
        {detectedFaces.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#FF5722' }}>Detected Faces:</h3>
            <ul style={{ color: '#FFFFFF' }}>
              {detectedFaces.map((face, index) => (
                <li key={index}>{face}</li>
              ))}
            </ul>

            {/* Display the detected face images */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
              {detectedFaceImages.map((imagePath, index) => (
                <img key={index} src={`http://127.0.0.1:5000/${imagePath}`} alt={`Detected face ${index}`} style={{ width: '150px', height: 'auto', margin: '10px' }} />
              ))}
            </div>
          </div>
        )}
        
        <video
          ref={videoRef}
          style={{
            width: '100%',
            maxWidth: '600px',
            borderRadius: '10px',
            marginTop: '20px',
            transform: 'scale(-1, 1)',
          }}
          autoPlay
          playsInline
        />

        {/* Terminate button below the video, only show if camera is active */}
        {isCameraActive && (
          <button
            onClick={handleTerminate}
            style={{
              backgroundColor: '#FF5722',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: "'Press Start 2P', cursive",
              marginTop: '10px',
              marginBottom: '40px',
            }}
          >
            Terminate
          </button>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#FF5722',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
              fontSize: '24px',
              fontFamily: "'Press Start 2P', cursive",
            }}
          >
            Loading...
          </div>
        )}
      </main>

      <Footer style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '20px' }}>
        8 BIT
      </Footer>
    </div>
  );
};

export default UploadPage;
