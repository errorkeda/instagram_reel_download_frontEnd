import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');

  // Handle URL input change
  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    setLoading(true); // Set loading state

    try {
      const response = await fetch('http://localhost:4000/instagram-download-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Check if the data contains a download link
      if (data.data && data.data.length > 0 && data.data[0].download_link) {
        setDownloadLink(data.data[0].download_link);
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccess(false);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container">
      <h1>Enter URL</h1>
      <form id="url-form" onSubmit={handleSubmit}>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          placeholder="Enter a URL"
          value={url}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {success && (
        <div className="download-container">
          <a href={downloadLink} download="video.mp4" className="download-button">
            Download Video
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
