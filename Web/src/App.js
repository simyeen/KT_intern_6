// fileName : App.js
// fileFunction : Page Component들을 보여주는 App.js 입니다.

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
