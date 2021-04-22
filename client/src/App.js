import { Typography, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";
import { ContextProvider } from "./Context";

const App = () => {
  return <ContextProvider></ContextProvider>;
};

export default App;
