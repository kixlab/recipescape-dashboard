import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./components/App";
import InitApp from "./containers/InitApp";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <InitApp />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
