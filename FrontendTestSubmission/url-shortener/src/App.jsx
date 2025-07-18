import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [time, setTime] = useState("");
  const [createdTime, setCreatedTime] = useState(null);
  const [expired, setExpired] = useState(false);

  function handleUrl() {
    if (!(longUrl.includes('https://') || longUrl.includes('http://'))) {
      alert("Enter a valid URL starting with http:// or https://");
      return;
    }

    const shortCode = nanoid(6);
    const finalShort = `https://short.ly/${shortCode}`;
    const createdAt = Date.now();
    const expireAfter = time ? parseInt(time) * 60 * 1000 : null;

    const entry = {
      longUrl,
      createdAt,
      expireAfter,
    };

    localStorage.setItem(shortCode, JSON.stringify(entry));
    setShortUrl(finalShort);
    setCreatedTime(new Date(createdAt).toLocaleString());
    setExpired(false);
  }

  useEffect(() => {
    if (!shortUrl) return;

    const code = shortUrl.split("/").pop();
    const data = JSON.parse(localStorage.getItem(code));
    if (data?.expireAfter && Date.now() > data.createdAt + data.expireAfter) {
      setExpired(true);
      localStorage.removeItem(code);
    }
  }, [shortUrl]);

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
              type="number"
              value={time}
              placeholder="Expiry time in minutes (optional)"
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
          <a className="view-stats" href="/stats">🔍 View All Stats</a>

          {shortUrl && !expired && (
            <div className="stats-section">
              <p><strong>Created:</strong> {createdTime}</p>
              <p><strong>Original:</strong> {longUrl}</p>
              <p><strong>Shortened:</strong> <a href={longUrl} target="_blank" rel="noreferrer">{shortUrl}</a></p>
            </div>
          )}

          {expired && <p><strong> This link has expired.</strong></p>}
        </main>
      </div>
    </div>
  );
}

export default App;
