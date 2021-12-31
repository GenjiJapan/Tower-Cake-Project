import React, { useEffect } from "react";
import { useHistory } from "react-router";

export default function Foo() {
  const history = useHistory();
  const onUnload = (e) => {
    e.preventDefault();
    console.log("HELLO WORLD");
    console.log("HELLO WORLD");
    console.log("HELLO WORLD");
    console.log("HELLO WORLD");
    console.log("HELLO WORLD");
    console.log("HELLO WORLD");
    console.log("HELLO WORLD");
    console.log("HELLO WORLD");
    console.log("HELLO WORLD");
    console.log("HELLO WORLD");
    console.log("HELLO WORLD");
  };
  useEffect(() => {
    window.addEventListener("beforeunload", onUnload);
  }, []);

  return (
    <div>
      Hello, World!
      {/* <MyRoutes /> */}
    </div>
  );
}
