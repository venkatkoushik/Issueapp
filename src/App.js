import "./App.css";
import Apperrorboundry from "./App.errorboundry";
import Routes from "./Routes";
import React from "react";
function App() {
  return (
    <div className="App">
      <Apperrorboundry>
        <Routes />
      </Apperrorboundry>
    </div>
  );
}

export default App;
