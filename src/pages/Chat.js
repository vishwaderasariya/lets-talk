import { Button, Input, Form, message, Card, Row, Col, Typography } from "antd";
import React from "react";
import { auth, db } from "../services/firebase";
import moment from "moment";
import Text from "antd/lib/typography/Text";

function Chat() {
  async function handleSubmit({ content }) {
    setContent(content);

    try {
      await db.ref("chats").push({
        content: content,
        timestamp: Date.now(),
        time: moment().calendar(),
        from: auth().currentUser.uid,

        //name: auth().currentUser.name,
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

  console.log(chats);
  React.useEffect(() => {
    setReaderror(null);
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          db.ref(`users/${snap.val().from}`).on("value", (snapshot) => {
            chats.push({
              ...snap.val(),
              senderInfo: snapshot.val(),
            });
          });
        });
        setChats(chats);
      });
    } catch (error) {
      setReaderror(error.message);
    }
  }, []);
  console.log(chats);
  return (
    <div style={{ margin: 50 }}>
      <Row justify="end">
        <Col>
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

      <Row justify="space-around">
        <Col span={12}>
          <Card>
            {chats.map((chat) => {
              return (
                <>
                  {chat.senderInfo.name}
                  <Typography.Text
                    style={{ backgroundColor: "#dbe3e5", lineHeight: "2" }}
                    key={chat.timestamp}
                  >
                    {chat.content}
                    <Row justify="end">
                      <Col>
                        <Text
                          style={{
                            fontSize: "12px",
                            opacity: 0.5,
                          }}
                        >
                          {chat.time}
                        </Text>
                      </Col>
                    </Row>
                  </Typography.Text>
                </>
              );
            })}

            <Form onFinish={handleSubmit}>
              <Form.Item name="content">
                <Input></Input>
              </Form.Item>
              <Row justify="end">
                <Col>
                  <Button type="primary" htmlType="submit">
                    send
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <p>Logged in as: {auth().currentUser.email} </p>
        </Col>
      </Row>
    </div>
  );
}

export default Chat;
