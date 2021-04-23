import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import Home from "src/pages/home";
import reportWebVitals from "./reportWebVitals";

console.log("hello");

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
