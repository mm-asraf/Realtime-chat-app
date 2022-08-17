import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Signup.css";
import { Link } from "react-router-dom";
import botImage from "../assets/bot.jpeg";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handling image state
  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const validateImage = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1Mb");
    } else {
      setImage(file);
      console.log(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUploadImage = async (e) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "srfzn1uo");

    try {
      setUploadingImage(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/daw41fyxr/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImage(false);
      return urlData.url;
    } catch (err) {
      setUploadingImage(false);
      console.log(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!image) {
      return alert("please Upload Your avatar");
    }
    const url = await handleUploadImage(image);
    console.log(url);
  };

  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ widht: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
            <h1 className="text-center">Create Account</h1>
            <div className="signup-profile-pic__container">
              <img
                src={imagePreview || botImage}
                className="signup-profile-pic"
                alt=""
              />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png ,image/jpeg "
                onChange={validateImage}
              />
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={handleName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={handleEmail}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your password"
                value={password}
                onChange={handlePassword}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {uploadingImage ? "Signing You..." : "Signup"}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  );
};

export default Signup;
