import React from "react";
import { Row } from "react-bootstrap";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies }) => {
  return (
    <Row className="movie-grid-row g-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Row>
  );
};

export default MovieGrid;
