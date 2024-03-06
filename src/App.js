import "./App.css";
import { useEffect, useReducer, useState } from "react";

function App() {
  const [agree, setAgree] = useReducer((agree) => !agree, false);
  return (
    <div className="App">
      <h2>Connect with me</h2>
      
      <input
        type="checkbox"
        value={agree}
        onChange={setAgree}
      />
      <label>I {agree ? "Agree" : "do not agree"}</label>
    </div>
  );
}

export default App;
