import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
//  asume Font Awesome cargado en index.html

const HackflixNav = () => {
   return (
      <Navbar className="navbar" fixed="top" expand="lg">
         <Container fluid>
            {/* Logo Hackflix */}
            <Navbar.Brand href="#" className="logo">
               HACKFLIX
            </Navbar.Brand>

            {/* Botón Home */}
            <Button variant="outline-light" className="nav-button">
               {/* Icono de Font Awesome */}
               <i className="fas fa-home me-2"></i> Home
            </Button>
         </Container>
      </Navbar>
   );
};

export default HackflixNav;
