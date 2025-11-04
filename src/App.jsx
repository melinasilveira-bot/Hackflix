import React, { useState, useEffect } from "react";
import { Container, Carousel } from "react-bootstrap";
// CRÍTICO: Confirma que la ruta es correcta.
import moviesData from "./data/movies.json";

// Importación de tus componentes
import HackflixNav from "./HackflixNav";
import RatingFilter from "./RatingFilter";
import MovieGrid from "./MovieGrid";

function App() {
   // Inicialización de estados
   const [movies, setMovies] = useState([]);
   const [filteredMovies, setFilteredMovies] = useState([]);
   const [minRating, setMinRating] = useState(0);
   const [carouselMovies, setCarouselMovies] = useState([]);

   useEffect(() => {
      // Carga de datos inicial
      if (Array.isArray(moviesData) && moviesData.length > 0) {
         setMovies(moviesData);
         setFilteredMovies(moviesData);
         // Selecciona las primeras 5 para el carrusel
         setCarouselMovies(moviesData.slice(0, 5));
      } else {
         console.error(
            "ERROR: No se pudo cargar el archivo movies.json o está vacío."
         );
      }
   }, []);

   useEffect(() => {
      // Lógica de filtrado
      if (minRating > 0) {
         const newFiltered = movies.filter(
            (movie) => movie.vote_average >= minRating
         );
         setFilteredMovies(newFiltered);
      } else {
         // Mostrar todas si no hay filtro activo
         setFilteredMovies(movies);
      }
   }, [minRating, movies]);

   const handleRatingChange = (stars) => {
      let requiredRating = 0;

      // Reglas de filtrado: 4 estrellas = 6+, 5 estrellas = 8+
      if (stars === 4) {
         requiredRating = 6;
      } else if (stars === 5) {
         requiredRating = 8;
      } else {
         requiredRating = 0; // Resetea el filtro
      }

      setMinRating(requiredRating);
   };

   // Muestra un mensaje de carga/error si los datos no están listos
   if (movies.length === 0) {
      return (
         <div className="app-container p-5 text-center text-white">
            Cargando datos... Por favor, asegúrate de que 'src/data/movies.json'
            existe y tiene contenido.
         </div>
      );
   }

   return (
      <div className="app-container">
         {/* 1. Navbar superpuesta */}
         <HackflixNav />

         {/* 2. Carrusel Hero */}
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
                              backgroundImage: `url(${movie.poster_path})`,
                           }}
                        />
                     </Carousel.Item>
                  ))}
               </Carousel>
            )}
         </section>

         {/* 3. Área de Contenido Principal y Filtrado */}
         <Container fluid className="content-area">
            <div className="filter-and-grid-header">
               <h3>Películas Disponibles</h3>
               <RatingFilter
                  onRatingChange={handleRatingChange}
                  currentRating={minRating}
               />
            </div>

            {/* 4. Mostrar el Grid de Películas filtradas */}
            <MovieGrid movies={filteredMovies} minRating={minRating} />
         </Container>
      </div>
   );
}

export default App;
