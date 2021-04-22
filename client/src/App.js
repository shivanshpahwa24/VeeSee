import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";
import { ContextProvider } from "./Context";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </Router>
    </ContextProvider>
  );
};

export default App;
