import { FrownFilled } from "@ant-design/icons";
import { List, Typography } from "antd";
import React from "react";
import { db } from "../services/firebase";

function Dashboard() {
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  function getUsers() {
    setLoading(true);
    let users = [];
    db.ref("users").on("value", (snapshot) => {
      snapshot.forEach((snap) => {
        users.push(snap.val());
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
        {users.length ? (
          <List
            bordered
            dataSource={users}
            renderItem={(item) => {
              return (
                <List.Item>
                  <Typography.Text>{item.name}</Typography.Text>
                </List.Item>
              );
            }}
          />
        ) : null}
      </div>
    );
}

export default Dashboard;
