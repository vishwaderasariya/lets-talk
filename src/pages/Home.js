import { Button } from "antd";
import React from "react";
import { auth } from "../services/firebase";
import { signup } from "../helpers/auth";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      {/* <Button
        onClick={() => {
          auth().signup();
        }}
      >
        <Link to="/signup">Signup</Link>
      </Button> */}
    </div>
  );
}

export default Home;
