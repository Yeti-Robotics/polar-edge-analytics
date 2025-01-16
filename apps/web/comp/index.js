import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import global styles
import App from "./app"; // Import main App component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

