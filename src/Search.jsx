import React, { useState } from "react";
import useInput from "./useInput";
import HackflixNav from "./HackflixNav";
import MovieDetailModal from "./MovieDetailModal"; // ✅ Importar modal

function Search() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const searchInput = useInput("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Estado para el modal
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async (e) => {
    const query = e.target.value;
    searchInput.onChange(e);

    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie); // ✅ Abrir modal
  };

  const handleModalClose = () => {
    setSelectedMovie(null); // ✅ Cerrar modal
  };

  return (
    <div className="app-container text-white">
      <HackflixNav />

      <div className="search-page">
        <h2>Buscar Películas</h2>

        <input
          type="text"
          placeholder="Escribe el nombre de la película..."
          {...searchInput}
          onChange={handleSearch}
          className="search-input"
        />

        {loading && <p className="search-loading">Buscando...</p>}

        <div className="search-grid">
          {results.length === 0 && !loading && searchInput.value.length > 1 && (
            <p className="no-results-message">No se encontraron resultados.</p>
          )}

          {results.map((movie) => (
            <div
              key={movie.id}
              className="search-card"
              onClick={() => handleCardClick(movie)} // ✅ Click abre modal
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=Sin+Imagen"
                }
                alt={movie.title}
              />
              <p className="search-title">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ MODAL */}
      <MovieDetailModal movie={selectedMovie} onHide={handleModalClose} />
    </div>
  );
}

export default Search;
