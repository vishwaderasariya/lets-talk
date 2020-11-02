import { Button, Card, Form, Input, message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { signin } from "../helpers/auth";

function Login() {
  async function handleSubmit({ email, password }) {
    await signin(email, password)
      .then(() => {
        message.success("logged In succesfully");
      })
      .catch((error) => {
        message.error(error.message);
      });
  }
  return (
    <div>
      <Card title="Login ">
        <Form onFinish={handleSubmit}>
          <Form.Item label="Email" name="email">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password></Input.Password>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <p>
            Haven't created account?<Link to="/signup">Signup</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
