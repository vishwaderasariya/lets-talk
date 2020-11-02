import { Button, Input, Form, message, Card, Row, Col } from "antd";
import React from "react";
import { auth, db } from "../services/firebase";
import momemt from "moment";
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 8,
//   },
// };

function Chat({ email }) {
  async function handleSubmit({ content }) {
    setContent(content);
    console.log(auth().currentUser.uid);
    try {
      await db.ref("chats").push({
        content: content,
        timestamp: Date.now(),
        time: Date(),
        uid: auth().currentUser.uid,
        email: auth().currentUser.email,
      });
      setContent("");
    } catch (error) {
      setWriteError(error.message);
    }
  }
  const [chats, setChats] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [readerror, setReaderror] = React.useState(null);
  const [writeError, setWriteError] = React.useState(null);

  React.useEffect(() => {
    setReaderror(null);
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setChats(chats);
      });
    } catch (error) {
      setReaderror(error.message);
    }
  }, []);

  return (
    <div>
      <Row justify="space-around">
        <Col span={12}>
          <Button
            type="primary"
            onClick={() => {
              auth().signOut();
            }}
          >
            sign out
          </Button>
          <Card>
            {chats.map((chat) => {
              return (
                <>
                  <strong>{chat.email}</strong>
                  <p
                    style={{ backgroundColor: "#dbe3e5", lineHeight: "2" }}
                    key={chat.timestamp}
                  >
                    {chat.content}
                    <Row justify="end">
                      <Col>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: 0.5,
                          }}
                        >
                          {chat.time}
                        </p>
                      </Col>
                    </Row>
                  </p>
                </>
              );
            })}

            <Form onFinish={handleSubmit}>
              <Form.Item name="content">
                <Input></Input>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                send
              </Button>
            </Form>
          </Card>
          <p>Logged in as: {auth().currentUser.email} </p>
        </Col>
      </Row>
    </div>
  );
}

export default Chat;
