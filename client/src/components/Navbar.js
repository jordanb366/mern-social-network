import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";

import Auth from "../utils/auth";

const AppNavbar = () => {
  return (
    <>
      <Navbar bg="secondary" variant="secondary" expand="lg">
        <Container fluid>
          <Navbar.Brand className="text-light" as={Link} to="/">
            MERN Social Network App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              {/* if user is logged in show profile link and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} className="text-light" to="/profile">
                    See Your Profile
                  </Nav.Link>
                  <Nav.Link className="text-light" onClick={Auth.logout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className="text-light" as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link className="text-light" as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
