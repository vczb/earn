import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('app')
  ReactDOM.render(<App />, rootEl)
})
