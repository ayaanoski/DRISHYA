import React, { useState } from 'react';
import Header from './common/Header'; // Adjust the path as necessary
import Footer from './common/Footer'; // Adjust the path as necessary

const FeedbackPage = () => {
  const [ratings, setRatings] = useState({
    question1: null,
    question2: null,
    question3: null,
  });

  const handleRatingChange = (question, rating) => {
    setRatings((prev) => ({
      ...prev,
      [question]: rating,
    }));
  };

  const handleSubmit = () => {
    console.log('Feedback submitted:', ratings);
    // Handle the feedback submission logic here (e.g., send to server)
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
        background: '#000000', // Set a solid black background to cover the entire page
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
            marginTop: '20px',
            fontFamily: "'Press Start 2P', cursive",
          }}
        >
          Feedback
        </h1>

        {/* Rating Questions */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#FFFFFF' }}>How would you rate our service?</h2>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange('question1', rating)}
                style={{
                  backgroundColor: ratings.question1 === rating ? '#FF5722' : '#FFFFFF',
                  color: '#FF5722',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  margin: '5px',
                  cursor: 'pointer',
                }}
              >
                {rating}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#FFFFFF' }}>How would you rate the quality of the content?</h2>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange('question2', rating)}
                style={{
                  backgroundColor: ratings.question2 === rating ? '#FF5722' : '#FFFFFF',
                  color: '#FF5722',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  margin: '5px',
                  cursor: 'pointer',
                }}
              >
                {rating}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#FFFFFF' }}>How likely are you to recommend us?</h2>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange('question3', rating)}
                style={{
                  backgroundColor: ratings.question3 === rating ? '#FF5722' : '#FFFFFF',
                  color: '#FF5722',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  margin: '5px',
                  cursor: 'pointer',
                }}
              >
                {rating}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#FF5722',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: "'Press Start 2P', cursive",
            marginTop: '20px',
          }}
        >
          Submit
        </button>
      </main>

      <Footer style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '20px' }}>
        8 BIT
      </Footer>
    </div>
  );
};

export default FeedbackPage;
