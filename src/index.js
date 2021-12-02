import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { LocationContextProvider } from "./components/location-context";

ReactDOM.render(
  <React.StrictMode>
    <LocationContextProvider>
      <App />
    </LocationContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
