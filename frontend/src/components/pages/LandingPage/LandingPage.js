import React, {  useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useHistory} from "react-router-dom";

import "./LandingPage.css";

const LandingPage = () => {

  const history =useHistory();

  const userInfo = localStorage.getItem("userInfo");
  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [userInfo,history]);

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
                <Button size="lg" className="landingbutton">
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
};
export default LandingPage;
