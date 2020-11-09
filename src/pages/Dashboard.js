import { FrownFilled } from "@ant-design/icons";
import { Button, Card, Col, List, Row, Typography } from "antd";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { auth, db } from "../services/firebase";

function Dashboard() {
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  function getUsers() {
    setLoading(true);
    let users = [];

    db.ref("users").on("value", (snapshot) => {
      snapshot.forEach((snap) => {
        if (snap.val().email === auth().currentUser.email) {
          return;
        }
        users.push({ ...snap.val(), id: snap.key });
      });
    });
    const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
    wait(1000).then(() => {
      setUsers(users);
      setLoading(false);
    });
  }

  React.useEffect(() => {
    getUsers();
  }, []);
  console.log(users);
  if (loading) {
    return <Typography.Text>Loading..</Typography.Text>;
  } else
    return (
      <div>
        <Row justify="center">
          <Col span={12}>
            <Card>
              {users.length ? (
                <List
                  bordered
                  dataSource={users}
                  renderItem={(item) => {
                    return (
                      <List.Item>
                        <Typography.Text strong style={{ fontSize: 21 }}>
                          <Link to={`/chat/${item.id}`}>{item.name}</Link>
                        </Typography.Text>
                      </List.Item>
                    );
                  }}
                />
              ) : null}
            </Card>
            <p>Logged in as: {auth().currentUser.email} </p>
            <Button
              type="primary"
              onClick={() => {
                auth().signOut();
              }}
            >
              sign out
            </Button>
          </Col>
        </Row>
      </div>
    );
}

export default Dashboard;
