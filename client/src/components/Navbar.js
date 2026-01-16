import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";

import Auth from "../utils/auth";

const AppNavbar = () => {
  const loggedIn = Auth.loggedIn();
  const profile = loggedIn ? Auth.getProfile() : null;
  const username =
    (profile && (profile.data?.username || profile.username || profile.name)) ||
    "User";

  return (
    <>
      <Navbar bg="secondary" variant="secondary" expand="lg">
        <Container fluid>
          <Navbar.Brand className="text-light" as={Link} to="/">
            MERN Social Network App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto align-items-center">
              {/* if user is logged in show profile link and logout */}
              {loggedIn ? (
                <>
                  <Navbar.Text className="text-light me-2">
                    Signed in as <strong className="ms-1">{username}</strong>
                  </Navbar.Text>

                  <NavDropdown
                    align="end"
                    title={<span className="text-light">Account</span>}
                    id="user-dropdown"
                    menuVariant="dark"
                  >
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => Auth.logout()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Button className="ms-2 text-light" as={Link} to="/login">
                    Login
                  </Button>
                  <Button className="ms-2 text-light" as={Link} to="/signup">
                    Signup
                  </Button>
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
