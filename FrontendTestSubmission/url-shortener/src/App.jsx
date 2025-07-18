import React, { useState } from "react";
import { nanoid } from "nanoid";
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [time, setTime] = useState(null);

  function handleUrl() {
    if (!(longUrl.includes('https://') || longUrl.includes('http://'))) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    const shortCode = nanoid(6);
    const finalShort = `https://short.ly/${shortCode}`;
    localStorage.setItem(shortCode, longUrl); // Local mapping
    setShortUrl(finalShort);
    setTime(new Date().toLocaleString());
  }

  return (
    <div className="global-container">
      <nav>URL SHORTENER</nav>

      <div className="mainpart">
        <h2>URL Shortener</h2>

        <main className="url-container">
          <p>Customize Up to 5 URLs</p>

          <div className="ip-container">
            <input
              type="text"
              value={longUrl}
              placeholder="Enter original URL"
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <input
              type="text"
              value={time}
              placeholder="Enter time in mins(optional)"
              onChange={(e) => setTime(e.target.value)}
            />

            <input
              type="text"
              value={shortUrl}
              placeholder="Short URL"
              readOnly
            />
          </div>

          <button onClick={handleUrl}>Generate URL</button>

          {shortUrl && (
            <div className="stats-section">
              <p><strong>URL Generated At:</strong> {time}</p>
              <p><strong>Original URL :</strong> {longUrl} </p>
              <p><strong>Shortened URL :</strong> {shortUrl}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
