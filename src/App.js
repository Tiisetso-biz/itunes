import React, { useState } from "react";
import './App.css';

function App() {
  //handle states
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaType, setMediaType] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [removedFavorites, setRemovedFavorites] = useState([]);

  //handle search functionality
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/developer.apple.com/search?q=${searchQuery}&media=${mediaType}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  //handle remove from favourites
  const handleRemoveFromFavorites = (item) => {
    setFavorites(favorites.filter((fav) => fav.trackId !== item.trackId));
    setRemovedFavorites([...removedFavorites, item]);
  };

  //handle add to favourites
  const handleAddToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  return (
    <>
    <h4>iTunes Search:</h4>
    <div className="home">
      {/* search bar */}
      <input
        type="text"
        placeholder="Type your query in here..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* dropdown for media type */}
       <select className="dropdown" value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
        <option value="all">All</option>
        <option value="movie">Movie</option>
        <option value="podcast">Podcast</option>
        <option value="music">Music</option>
        <option value="audiobook">Audiobook</option>
        <option value="shortFilm">Short Film</option>
        <option value="tvShow">TV Show</option>
        <option value="software">Software</option>
        <option value="ebook">Ebook</option>
      </select>

      {/* search button */}
      <button className="button" onClick={handleSearch}>Search</button>

      <h4>Search Results</h4>
      <ul>
        {searchResults.map((item) => (
          // list of search results
          <li key={item.trackId}>
            {item.trackName} by {item.artistName} ({item.kind})
            {/* button to add item to favourites */}
            <button onClick={() => handleAddToFavorites(item)}>
              Add to Favourites
            </button>
          </li>
        ))}
      </ul>

      <h4>Favorites</h4>
      <ul>
        {favorites.map((item) => (
          <li key={item.trackId}>
            {item.trackName} by {item.artistName} ({item.kind})
            {/*button to remove item from favourites */}
            <button onClick={() => handleRemoveFromFavorites(item)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default App;
