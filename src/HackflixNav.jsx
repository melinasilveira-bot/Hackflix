import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // IMPORTAR Link

const HackflixNav = () => {
  return (
    <Navbar className="navbar" fixed="top" expand="lg">
      <Container fluid>
        {/* Logo Hackflix */}
        <Navbar.Brand as={Link} to="/" className="logo">
          HACKFLIX
        </Navbar.Brand>

        {/* Botón Home */}
        <Button as={Link} to="/" variant="outline-light" className="nav-button">
          <i className="fas fa-home me-2"></i> Home
        </Button>

        {/* Botón Buscar */}
        <Button
          as={Link}
          to="/buscar"
          variant="outline-light"
          className="nav-button ms-2"
        >
          <i className="fas fa-search me-2"></i> Buscar
        </Button>
      </Container>
    </Navbar>
  );
};

export default HackflixNav;
