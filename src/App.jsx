import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Carousel } from "react-bootstrap";

import HackflixNav from "./HackflixNav";
import RatingFilter from "./RatingFilter";
import MovieGrid from "./MovieGrid";
import MovieDetailModal from "./MovieDetailModal"; //  IMPORTADO EL NUEVO MODAL

function App() {
   const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

   // Estados existentes
   const [movies, setMovies] = useState([]);
   const [filteredMovies, setFilteredMovies] = useState([]);
   const [minRating, setMinRating] = useState(0);
   const [carouselMovies, setCarouselMovies] = useState([]);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);

   // NUEVOS ESTADOS PARA EL MODAL
   const [selectedMovie, setSelectedMovie] = useState(null);

   // Obtener películas desde TMDb
   useEffect(() => {
      // Lógica de carga de películas
      fetch(
         `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
      )
         .then((res) => res.json())
         .then((data) => {
            if (data.results && data.results.length > 0) {
               setMovies((prev) => [...prev, ...data.results]);
               if (page === 1) {
                  setCarouselMovies(data.results.slice(0, 5));
               }
               if (page >= data.total_pages) setHasMore(false);
            } else {
               setHasMore(false);
            }
         })
         .catch((error) => console.error("Error al obtener películas:", error));
   }, [page]);

   // Lógica de Scroll y Filtrado
   const fetchMoreMovies = () => {
      if (minRating === 0) {
         setPage((prev) => prev + 1);
      }
   };

   const handleRatingChange = (stars) => {
      let requiredRating = 0;
      if (stars === 4) requiredRating = 6;
      else if (stars === 5) requiredRating = 8;
      else requiredRating = 0;
      setMinRating(requiredRating);
   };

   useEffect(() => {
      if (minRating === 0) {
         setFilteredMovies(movies);
         if (page < 500) setHasMore(true);
      } else {
         const newFilteredMovies = movies.filter((movie) => {
            return movie.vote_average >= minRating;
         });
         setFilteredMovies(newFilteredMovies);
         setHasMore(false);
      }
   }, [minRating, movies]);

   // ---------------------------------------------------------------------
   //  NUEVAS FUNCIONES PARA EL MODAL
   // ---------------------------------------------------------------------
   const handleCardClick = (movie) => {
      setSelectedMovie(movie); // Guarda la película para mostrar el modal
   };

   const handleModalClose = () => {
      setSelectedMovie(null); // Borra la película para ocultar el modal
   };
   // ---------------------------------------------------------------------

   const showNoResultsMessage = minRating > 0 && filteredMovies.length === 0;

   if (movies.length === 0) {
      return (
         <div className="app-container p-5 text-center text-white">
            Cargando datos... Por favor, espera unos segundos.
         </div>
      );
   }

   return (
      <div className="app-container">
         <HackflixNav />

         {/* Carrusel principal */}
         <section className="hero-carousel-container">
            <h2 className="carousel-title">¡Tus películas favoritas!</h2>
            {carouselMovies.length > 0 && (
               <Carousel
                  fade
                  controls={false}
                  indicators={false}
                  interval={4000}
                  className="hackflix-carousel"
               >
                  {carouselMovies.map((movie, index) => (
                     <Carousel.Item key={index}>
                        <div
                           className="carousel-item-content"
                           style={{
                              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                           }}
                        />
                     </Carousel.Item>
                  ))}
               </Carousel>
            )}
         </section>

         <Container fluid className="content-area">
            <div className="filter-and-grid-header">
               <h3>Películas Disponibles</h3>
               <RatingFilter
                  onRatingChange={handleRatingChange}
                  currentRating={minRating}
               />
            </div>

            <InfiniteScroll
               dataLength={filteredMovies.length}
               next={fetchMoreMovies}
               hasMore={hasMore}
               loader={
                  <h4 className="text-center text-white">
                     Cargando más películas...
                  </h4>
               }
               endMessage={
                  !hasMore &&
                  minRating === 0 &&
                  movies.length > 0 && (
                     <p style={{ textAlign: "center", color: "white" }}>
                        <b>¡Has visto todas las películas populares!</b>
                     </p>
                  )
               }
            >
               {showNoResultsMessage ? (
                  <p
                     className="no-results-message text-center text-white p-5"
                     style={{ fontSize: "1.2em" }}
                  >
                     Lo sentimos, no se encontraron películas con el rating
                     solicitado.
                  </p>
               ) : (
                  <MovieGrid
                     movies={filteredMovies}
                     onCardClick={handleCardClick}
                  />
               )}
            </InfiniteScroll>
         </Container>

         {/* 🌟 AÑADIDO: RENDERIZAR EL MODAL */}
         <MovieDetailModal movie={selectedMovie} onHide={handleModalClose} />
      </div>
   );
}

export default App;
