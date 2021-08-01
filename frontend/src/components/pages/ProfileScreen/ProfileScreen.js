import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MainScreen from "../../common/MainScreen";
import Loading from "../../common/Loading";
import ErrorMessage from "../../common/ErrorMessage";
import "./ProfileScreen.css";
import axios from "axios";

const ProfileScreen = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const [name, setName] = useState(userInfo && userInfo.name);
  const [email, setEmail] = useState(userInfo && userInfo.email);
  const [pic, setPic] = useState(userInfo && userInfo.pic);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (!pics) {
      setPic(userInfo.pic);
    } else if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notekeeper");
      data.append("cloud_name", "dl1d1ltor");
      fetch("https://api.cloudinary.com/v1_1/dl1d1ltor/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        setLoading(true);
        const { data } = await axios.put(
          "http://localhost:3030/api/users/profile",
          { name, email, pic, password },
          config
        );
        console.log(data);
        setLoading(false);
        setSuccess(true);
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {message && (
                <ErrorMessage variant="danger">{message}</ErrorMessage>
              )}
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  disabled
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="file"
                  label="Upload Profile Picture"
                  //   custom
                  className="h-100 p-0"
                />
              </Form.Group>
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
