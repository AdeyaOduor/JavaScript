/* In this exercise we'll build an app that displays "Hello <<name>>" using props and function components.
*/
import React from "react";

// Create a new function component named `Greeting`.
function Greeting({ name }) {
  return <div>Hello {name}</div>;
}

//Let the `Greeting` render the text "Hello", rendered in a div element.
export default function App() {
  return (
    <>
      <h1>Exercise 2</h1>
      {/* 🌟 [03] - Render the `Greeting` here. */}
      <Greeting name="David" />
      {/* 🌟 [04] - Pass a prop called `name` with your own name as value to the `Greeting`. */}
    </>
  );
}

/*  Let the `Greeting` component receive the `name` prop en render it after "Hello".
FINISHED! 💯  You should see a heading "Exercise 2" and the text "Hello " followed by the value of the `name` prop". 💯 */
