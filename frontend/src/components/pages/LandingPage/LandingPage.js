
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css"
const LandingPage =() =>{
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">WELCOME!!!</h1>
              <p className="subtitle">Safe place for all your secret notes</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size='lg' className='landingbutton'>
                  Login
                </Button>
                </a>
              <a href="/register">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}
export default LandingPage;