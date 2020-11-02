import React, { useEffect } from "react";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signup } from "../helpers/auth";

function Signup() {
  async function handleSubmit({ email, password }) {
    await signup(email, password)
      .then(() => {
        message.success("Account created succesfully");
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  return (
    <div>
      <Row justify="space-around">
        <Col span={12}>
          <Card title="Sign up">
            <Form onFinish={handleSubmit}>
              <Form.Item label="Email" name="email">
                <Input></Input>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input.Password></Input.Password>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
              <p>or</p>
              <Button onClick={signInWithGoogle} type="primary">
                Sign up with google
              </Button>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Signup;
