// why-did-you-render
import "./utils/wydr";

import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "antd/dist/antd.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
