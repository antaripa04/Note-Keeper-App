import {
  Navbar,
  NavDropdown,
  Nav,
  Container,
  Form,
  FormControl,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const Header = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const history = useHistory();
  useEffect(() => console.log("mounted"), [userInfo, history]);
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("notes");
    history.push("/");
  };
  return (
    <Navbar bg="primary" expand="lg" variant="light">
      <Container>
        <Navbar.Brand href="/">Note Keeper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userInfo ? (
            <>
              <Nav className="m-auto">
                {/* <Form>
                  <FormControl
                    type="text"
                    placeholder="search"
                    className="mr-sm-2"
                  />
                </Form> */}
              </Nav>
              <Nav>
                <Nav.Link href="/mynotes">MY NOTES</Nav.Link>
                <NavDropdown
                  title={`${userInfo.name}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="m-auto"></Nav>
              <Nav className="ps-5">
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
