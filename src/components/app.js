import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      This is a sample stateful React application
      with static HTML.
      <br />
      <br />
      Here is a button that will track
      how many times you click it:
      <br />
      <br />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}