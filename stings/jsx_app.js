// In this exercise I build an app that displays "Hello David, welcome to LakeHub" using JSX.
import React from "react";

export default function App() {
  const text = "Hello David, welcome to LakeHub!";

  return (
    <>
      <h1>Exercise 1</h1>

      <div>{text}</div>
    </>
  );
}
