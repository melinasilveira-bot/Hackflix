import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Form, Row, Col } from "react-bootstrap";

const RatingFilter = ({ onRatingChange }) => {
   const [rating, setRating] = useState(0);

   const handleRating = (rate) => {
      setRating(rate);
      onRatingChange(rate);
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

         {/* Componente de Estrellas */}
         <Col xs="auto" className="p-0">
            <Rating
               onClick={handleRating}
               initialValue={rating}
               size={25}
               fillColor="var(--color-pink-soft)"
               emptyColor="#333"
               className="star-rating"
               allowFraction={false}
            />
         </Col>

         {/* Texto de " & Más" */}
         {rating > 0 && (
            <Col xs="auto" className="p-0">
               <span className="text-muted">& Más</span>
            </Col>
         )}
      </Form.Group>
   );
};

export default RatingFilter;
