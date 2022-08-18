import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/appApi";
import { AppContext } from "../context/appContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const { socket } = useContext(AppContext);

  const navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({ email, password }).then(({ res }) => {
      if (res) {
        //socket works
        socket.emit("new-user");
        // navigate to the chat
        navigate("/chat");
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form className="log_set" onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {error && (
                <p className="alert alert-danger">Invalid email or password</p>
              )}
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your Email"
                value={email}
                required
                onChange={handleEmail}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your password"
                value={password}
                required
                onChange={handlePassword}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="btn__center">
              {isLoading ? <Spinner animation="grow" /> : "Login"}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Don't have an account ? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
