import React from "react";
import { Row } from "react-bootstrap";
import MovieCard from "./MovieCard";

// Recibimos la nueva prop 'onCardClick'
const MovieGrid = ({ movies, onCardClick }) => {
   return (
      <Row className="movie-grid-row g-3">
         {movies.map((movie) => (
            // Pasamos la función 'onCardClick' a la MovieCard
            <MovieCard key={movie.id} movie={movie} onCardClick={onCardClick} />
         ))}
      </Row>
   );
};

export default MovieGrid;
