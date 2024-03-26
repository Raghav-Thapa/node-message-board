import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Routing from "./config/routing.config.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
