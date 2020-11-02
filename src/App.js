import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { auth } from "./services/firebase";
import { PrivateRoute, PublicRoute } from "./helpers/routes";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    });
  });

  if (loading) {
    return <h2>Loading..</h2>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute
          exact
          path="/chat"
          authenticated={authenticated}
          component={Chat}
        ></PrivateRoute>
        <PublicRoute
          exact
          path="/login"
          authenticated={authenticated}
          component={Login}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/signup"
          authenticated={authenticated}
          component={Signup}
        ></PublicRoute>
      </Switch>
    </Router>
  );
}

export default App;
