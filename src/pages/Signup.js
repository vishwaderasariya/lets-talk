import React, { useEffect } from "react";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { Link } from "react-router-dom";
import { signInWithGoogle, signup } from "../helpers/auth";
import { auth, db } from "../services/firebase";
import { GoogleOutlined } from "@ant-design/icons";

function Signup() {
  async function handleSubmit({
    email,
    password,
    name,
    phoneNumber,
    age,
    gender,
  }) {
    console.log(email, password);

    await signup(email, password)
      .then(() => {
        message.success("Account created succesfully");

        db.ref("users").child(auth().currentUser.uid).set({
          email,
          name,
          phoneNumber,
          age,
          gender,
        });
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  const [users, setUsers] = React.useState([]);
  const [readerror, setReaderror] = React.useState(null);

  React.useEffect(() => {
    setReaderror(null);
    try {
      db.ref("users").on("value", (snapshot) => {
        let users = [];
        snapshot.forEach((snap) => {
          users.push(snap.val());
        });
        setUsers(users);
      });
    } catch (error) {
      setReaderror(error.message);
    }
  }, []);

  return (
    <div>
      <Row justify="space-around">
        <Col span={12}>
          <Card title="Sign up">
            <Form onFinish={handleSubmit}>
              <Form.Item label="Name" name="name">
                <Input></Input>
              </Form.Item>
              <Form.Item label="Age" name="age">
                <Input></Input>
              </Form.Item>
              <Form.Item label="Gender" name="gender">
                <Input></Input>
              </Form.Item>
              <Form.Item label="PhoneNumber" name="phoneNumber">
                <Input></Input>
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input></Input>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input.Password></Input.Password>
              </Form.Item>
              <Row>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Sign Up
                  </Button>
                </Col>
                <Col>
                  <p>or</p>
                </Col>
                <Col>
                  <Button onClick={signInWithGoogle} type="default">
                    <GoogleOutlined />
                  </Button>
                </Col>
              </Row>
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
