import { 
    Navbar, NavDropdown,Nav,Container,Form,FormControl
 } from 'react-bootstrap';
const Header = () => {
    return (
        <Navbar bg="primary" expand="lg" variant="light">
  <Container>
  <Navbar.Brand href="/">Note Zipper</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className = "m-auto"> 
            <Form inline>
                <FormControl
                type="text"
                placeholder="search"
                className="mr-sm-2"
                />
            </Form>
            </Nav>
      <Nav>
        <Nav.Link href="/mynotes">MY NOTES</Nav.Link>
        <NavDropdown title="PROFILE" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">MY PROFILE</NavDropdown.Item>

          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">LOGOUT</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    );
};
export default Header;
