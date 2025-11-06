import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Carousel } from "react-bootstrap";

import HackflixNav from "./HackflixNav";
import RatingFilter from "./RatingFilter";
import MovieGrid from "./MovieGrid";

function App() {
   const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

   // Estados
   const [movies, setMovies] = useState([]);
   const [filteredMovies, setFilteredMovies] = useState([]);
   const [minRating, setMinRating] = useState(0);
   const [carouselMovies, setCarouselMovies] = useState([]);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);

   // Obtener películas desde TMDb
   useEffect(() => {
      fetch(
         `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
      )
         .then((res) => res.json())
         .then((data) => {
            if (data.results && data.results.length > 0) {
               setMovies((prev) => [...prev, ...data.results]);
               setFilteredMovies((prev) => [...prev, ...data.results]);
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

   // Cargar más películas al hacer scroll
   const fetchMoreMovies = () => {
      setPage((prev) => prev + 1);
   };

   // Filtro por rating
   const handleRatingChange = (stars) => {
      let requiredRating = 0;
      if (stars === 4) requiredRating = 6;
      else if (stars === 5) requiredRating = 8;
      else requiredRating = 0;
      setMinRating(requiredRating);
   };

   // Mostrar mensaje de carga si no hay datos
   if (movies.length === 0) {
      return (
         <div className="app-container p-5 text-center text-white">
            Cargando datos... Por favor, espera unos segundos.
         </div>
      );
   }

   return (
      <div className="app-container">
         {/* Navbar */}
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

         {/* Área principal */}
         <Container fluid className="content-area">
            <div className="filter-and-grid-header">
               <h3>Películas Disponibles</h3>
               <RatingFilter
                  onRatingChange={handleRatingChange}
                  currentRating={minRating}
               />
            </div>

            {/* Scroll infinito */}
          <InfiniteScroll
   dataLength={movies.length} // cantidad actual de películas
   next={fetchMoreMovies} // función que carga más
   hasMore={hasMore} // si hay más películas
   loader={
      <h4 className="text-center text-white">
         Cargando más películas...
      </h4>
   }
>
   <MovieGrid 
      movies={filteredMovies} 
      loadMore={fetchMoreMovies} 
      hasMore={hasMore} 
   />
</InfiniteScroll>

         </Container>
      </div>
   );
}

export default App;
