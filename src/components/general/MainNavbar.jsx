import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useTheme } from "../../hooks/useTheme";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

function MainNavbar(props) {
  const { color, changeColor } = useTheme();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  // console.log("User in Navbar:", user);

  return (
    <Navbar bg={color} expand="md" onClick={() => changeColor("warning")}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          FB9 Starter BootSass 5
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link as={Link} to="/query">
              Query Page
            </Nav.Link>
          </Nav>
          <Nav className="">
            <Nav.Link as={Link} to="/pagination">
              Pagination Page
            </Nav.Link>
          </Nav>
          <Nav className="">
            <Nav.Link as={Link} to="/sample-page">
              Sample Page
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {!user && (
              <Nav.Link
                className="btn btn-dark py-2 px-3 text-light"
                as={Link}
                to="/login"
              >
                Login
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link
                className="btn btn-success py-2 px-3 ms-1 text-light"
                as={Link}
                to="/signup"
              >
                Signup
              </Nav.Link>
            )}
            {user && (
              <>
                <h6 className="mt-2">
                  Welcome{" "}
                  <span className="me-4 badge rounded-pill bg-dark p-2">
                    {user.displayName}
                  </span>
                </h6>
                <Nav.Link
                  className="btn btn-danger py-2 px-3 ms-1 text-light"
                  as={Link}
                  onClick={logout}
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
