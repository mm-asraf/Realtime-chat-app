import React from "react";
import { Button, Col, Row, Form } from "react-bootstrap";

import "./MessageForm.css";
const MessageForm = () => {
  const handleMessageForm = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="messages-output"></div>
      <Form onSubmit={handleMessageForm}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control type="text" placeholder="message"></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "orange" }}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
