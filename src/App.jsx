import React from "react";
import bgImage from "./assets/images/bg-desktop-dark.jpg";
import Todos from "./components/Todos";

function App() {
  return (
    <>
      <div className="wrapper w-screen h-screen flex flex-col py-3 px-5 items-center bg-white dark:bg-slate-900">
        <img
          src={bgImage}
          alt="backgroundImg"
          className="rounded-2xl w-full select-none"
        />
        <Todos />
      </div>
    </>
  );
}

export default App;
