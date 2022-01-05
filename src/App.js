import React, { useState } from "react";
import HeaderContainer from "./container/HeaderContainer";
import HomePage from "./page/HomePage";

function App() {
  const [postList, setPostList] = useState(0);

  return (
    <>
      <HeaderContainer {...{ setPostList }} />
      {postList === 0 && <HomePage />}
    </>
  );
}

export default App;
