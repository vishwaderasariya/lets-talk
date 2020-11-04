import { Button } from "antd";
import React from "react";
import { auth } from "../services/firebase";
import { signup } from "../helpers/auth";
import { Link, Redirect } from "react-router-dom";

function Home() {
  return (
    <div>
      <Redirect to="/login"></Redirect>
    </div>
  );
}

export default Home;
