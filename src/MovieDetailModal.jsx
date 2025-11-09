import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * Muestra una ventana modal con los detalles de la película seleccionada.
 * @param {object} props - Propiedades del componente.
 * @param {object | null} props.movie - Objeto de la película a mostrar, o null si el modal está cerrado.
 * @param {function} props.onHide - Función para cerrar el modal.
 */
const MovieDetailModal = ({ movie, onHide }) => {
   // Si no hay película seleccionada, no renderizamos el modal
   if (!movie) {
      return null;
   }

   // Formatear la fecha para una mejor presentación
   const releaseDate = movie.release_date
      ? new Date(movie.release_date).toLocaleDateString("es-ES", {
           year: "numeric",
           month: "long",
           day: "numeric",
        })
      : "Fecha desconocida";

   // Obtener la URL del fondo de pantalla para un mejor diseño
   const backdropUrl = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : null;

   return (
      <Modal
         show={!!movie}
         onHide={onHide}
         centered
         dialogClassName="modal-90w hackflix-modal-custom"
         aria-labelledby="movie-detail-modal"
      >
         <div
            className="modal-content-wrapper"
            style={{
               backgroundImage: backdropUrl
                  ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.95)), url(${backdropUrl})`
                  : "none",
               backgroundSize: "cover",
               backgroundPosition: "center",
               backgroundColor: "#1a1a1a", // Fondo de fallback
               borderRadius: "8px",
            }}
         >
            <Modal.Header
               closeButton
               className="bg-transparent border-0 pt-3 px-4"
               closeVariant="white"
            >
               <Modal.Title
                  id="movie-detail-modal"
                  className="text-white text-shadow-lg"
               >
                  {movie.title || "Título no disponible"}
               </Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-transparent text-white p-4 pt-0">
               <div className="d-flex align-items-start mb-4">
                  {/* Póster de la película */}
                  {movie.poster_path && (
                     <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`Poster de ${movie.title}`}
                        style={{
                           width: "120px",
                           height: "auto",
                           marginRight: "20px",
                           borderRadius: "8px",
                           boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                        }}
                        className="d-none d-sm-block"
                     />
                  )}

                  {/* Detalles */}
                  <div className="flex-grow-1">
                     <h4 className="mb-3 text-danger">Detalles</h4>
                     <p className="mb-1">
                        <strong>Publicado:</strong> {releaseDate}
                     </p>
                     <p className="mb-3">
                        <strong>Rating:</strong>
                        <span
                           className="badge bg-danger ms-2"
                           style={{ fontSize: "1em" }}
                        >
                           {movie.vote_average
                              ? movie.vote_average.toFixed(1)
                              : "N/A"}
                        </span>
                     </p>
                  </div>
               </div>

               <h4 className="mb-2 text-danger">Resumen</h4>
               <p className="mb-4 description-text">
                  {movie.overview || "No hay resumen disponible."}
               </p>

               <div className="d-flex justify-content-end mt-3">
                  <Button variant="danger" onClick={onHide} className="fw-bold">
                     Cerrar
                  </Button>
               </div>
            </Modal.Body>
         </div>
      </Modal>
   );
};

export default MovieDetailModal;
