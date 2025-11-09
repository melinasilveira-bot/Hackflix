import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

// Componente StarIcon con SVG para evitar dependencias
const StarIcon = ({ filled, onStarClick, index, onHover, onLeave }) => (
   <svg
      onClick={() => onStarClick(index)}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      height="25"
      width="25"
      viewBox="0 0 24 24"
      // Colores basados en tu estilo
      fill={filled ? "var(--color-pink-soft, #ff4d6d)" : "#333"}
      stroke={filled ? "var(--color-pink-soft, #ff4d6d)" : "#333"}
      strokeWidth="1.5"
      style={{ cursor: "pointer", transition: "fill 0.2s", margin: "0 1px" }}
   >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
   </svg>
);

const RatingFilter = ({ onRatingChange }) => {
   // Usamos 'activeStars' para el estado interno (número de estrellas de 0 a 5)
   const [activeStars, setActiveStars] = useState(0);
   // Usamos 'hoveredStars' para el feedback visual al pasar el ratón
   const [hoveredStars, setHoveredStars] = useState(0);

   // Determina cuántas estrellas deben estar llenas (hover toma precedencia)
   const displayStars = hoveredStars > 0 ? hoveredStars : activeStars;

   // Maneja el click en una estrella
   const handleClick = (starIndex) => {
      const newStarCount = starIndex + 1; // El número de estrellas clicadas (1 a 5)

      let starsToReport;

      // Lógica de reseteo: si se hace clic en el rating actual, se resetea a 0.
      if (newStarCount === activeStars) {
         setActiveStars(0);
         starsToReport = 0;
      } else {
         setActiveStars(newStarCount);
         starsToReport = newStarCount;
      }

      // 3. Pasamos el NÚMERO DE ESTRELLAS al componente App.jsx (0, 4, o 5)
      onRatingChange(starsToReport);
   };

   // Función de reseteo explícito
   const handleReset = (e) => {
      e.preventDefault();
      setActiveStars(0);
      onRatingChange(0);
   };

   // Manejo de hover
   const handleHover = (starIndex) => {
      setHoveredStars(starIndex + 1);
   };

   const handleLeave = () => {
      setHoveredStars(0);
   };

   return (
      <Form.Group
         as={Row}
         className="align-items-center rating-filter-container"
      >
         {/* Etiqueta de Filtrado */}
         <Col xs="auto" className="me-2 p-0">
            <Form.Label className="text-muted mb-0">
               Filtrar por rating:
            </Form.Label>
         </Col>

         {/* Componente de Estrellas (Col 2) */}
         <Col xs="auto" className="p-0 d-flex">
            {[...Array(5)].map((_, index) => (
               <StarIcon
                  key={index}
                  index={index}
                  filled={index < displayStars} // Llena si el índice es menor que las estrellas a mostrar
                  onStarClick={handleClick}
                  onHover={handleHover}
                  onLeave={handleLeave}
               />
            ))}
         </Col>

         {/* Texto de " & Más" (Col 3) y Botón de Reset */}
         {activeStars > 0 && (
            <Col xs="auto" className="p-0 d-flex align-items-center">
               <span className="text-muted me-2">& Más</span>
               <button
                  onClick={handleReset}
                  style={{
                     background: "none",
                     border: "none",
                     color: "#ff4d6d",
                     cursor: "pointer",
                     fontSize: "1.2em",
                     padding: 0,
                  }}
                  title="Resetear Filtro"
               >
                  &times;
               </button>
            </Col>
         )}
      </Form.Group>
   );
};

export default RatingFilter;
