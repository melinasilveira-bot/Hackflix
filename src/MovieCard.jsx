import React from "react";
import { Col, Card } from "react-bootstrap";

const MovieCard = ({ movie }) => {
   const formattedRating = movie.vote_average
      ? movie.vote_average.toFixed(1)
      : "N/A";

   return (
      // Col define el ancho en el Grid de Bootstrap
      <Col xs={6} sm={4} md={3} lg={2} className="p-1">
         <Card className="movie-card bg-dark text-white border-0">
            {/* Usamos el póster como imagen principal de la tarjeta */}
            <Card.Img
   variant="top"
   src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
   alt={movie.title}
   className="movie-poster"
/>


            {/* Overlay de información (visible al hacer hover con CSS) */}
            <div className="movie-info-overlay">
               <Card.Title className="movie-title">{movie.title}</Card.Title>
               <Card.Text className="movie-rating">
                  Rating: **{formattedRating}** ({movie.vote_count} votos)
               </Card.Text>
               <Card.Text className="movie-date text-muted">
                  {movie.release_date.substring(0, 4)}
               </Card.Text>
            </div>
         </Card>
      </Col>
   );
};

export default MovieCard;
