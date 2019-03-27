import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// prevent reloading as applying styles
if (module.hot) {
  module.hot.accept();
}

serviceWorker.unregister();
