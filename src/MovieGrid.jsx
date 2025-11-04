import React from "react";
import { Row } from "react-bootstrap";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, minRating }) => {
   if (movies.length === 0 && minRating > 0) {
      return (
         <div className="no-results-message">
            Lo sentimos, no se encontraron películas con el rating solicitado
            (Mínimo requerido: {minRating}/10).
         </div>
      );
   }

   return (
      // Row para envolver todas las cards y usar el sistema de Grid
      <Row className="movie-grid-row g-3">
         {movies.map((movie) => (
            // MovieCard ya incluye Col para el layout
            <MovieCard key={movie.id} movie={movie} />
         ))}
      </Row>
   );
};

export default MovieGrid;
