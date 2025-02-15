"use client";
import { useState } from "react";

function Counter({ userData }) {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <p>There are total {userData.length} users</p>
    </>
  );
}

export default Counter;
