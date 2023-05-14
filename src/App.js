import React, { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?q=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleAddToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Search Results</h2>
      <ul>
        {searchResults.map((item) => (
          <li key={item.trackId}>
            {item.trackName} by {item.artistName}
            <button onClick={() => handleAddToFavorites(item)}>
              Add to Favorites
            </button>
          </li>
        ))}
      </ul>

      <h2>Favorites</h2>
      <ul>
        {favorites.map((item) => (
          <li key={item.trackId}>
            {item.trackName} by {item.artistName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
