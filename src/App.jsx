import { useState, useEffect } from "react";
import "./App.css";
import useDebounce from "./useDebounce";

const API_URL = "https://api.unsplash.com/search/photos";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = async () => {
    const response = await fetch(
      `${API_URL}?query=${debouncedSearchTerm}&client_id=${import.meta.env.VITE_ACCESS_KEY}`
    );
    const data = await response.json();
    return data.results;
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch().then((results) => setResults(results));
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="App">
      <div>
        <label htmlFor="search-input">Search Unsplash images</label>
        <input type="search" id="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div>
        {results?.map((result) => (
          <img key={result.id} src={result.urls.small} alt={result.alt_description} />
        ))}
      </div>
    </div>
  );
}

export default App;
