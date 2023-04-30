import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = 'bdf58b6733123f06421f166e28338efba425d037';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://emoji-api.com/emojis?access_key=${API_KEY}`);
      const json = await response.json();
      setEmojis(json);
    };

    fetchData();
  }, []);

  const handleSearch = event => {
    event.preventDefault();
    const filteredEmojis = emojis.filter(
      emoji => emoji.unicodeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEmojis(filteredEmojis);
  };

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const resetSearch = () => {
    const fetchData = async () => {
      const response = await fetch(`https://emoji-api.com/emojis?access_key=${API_KEY}`);
      const json = await response.json();
      setEmojis(json);
    };
    fetchData();
    setSearchTerm('');
  };

  return (
    <div className="App">
      <h1>Emoji Search</h1>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search for an emoji" value={searchTerm} onChange={handleInputChange} />
        <button type="submit">Search</button>
        <button type="button" onClick={resetSearch}>Reset</button>
      </form>
      <ul>
        {emojis.map(emoji => (
          <li key={emoji.unicodeName}>{emoji.character}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
