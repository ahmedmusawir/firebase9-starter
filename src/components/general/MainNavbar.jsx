import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function MainNavbar(props) {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          FB9 Starter BootSass 5
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/sample-page">
              Sample Page
            </Nav.Link>
          </Nav>
          <Nav.Link
            className="btn btn-secondary py-2 px-3 ms-1 text-light ms-auto"
            as={Link}
            to="/login"
          >
            Login
          </Nav.Link>
          <Nav.Link
            className="btn btn-success py-2 px-3 ms-1 text-light ms-auto"
            as={Link}
            to="/signup"
          >
            Signup
          </Nav.Link>
          <Nav.Link
            className="btn btn-danger py-2 px-3 ms-1 text-light ms-auto"
            as={Link}
            to="#"
          >
            Logout
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

MainNavbar.propTypes = {};

export default MainNavbar;
