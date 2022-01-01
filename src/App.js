import React, { useState } from "react";
import HeaderContainer from "./container/HeaderContainer";
import InfoContainer from "./container/InfoContainer";
import TeamContainer from "./container/TeamContainer";
import HomePage from "./page/HomePage";

function App() {
  const [postList, setPostList] = useState(0);

  return (
    <>
      <HeaderContainer {...{ setPostList }} />
      {postList === 0 && <HomePage />}
      {postList === 1 && <InfoContainer />}
      {postList === 2 && <TeamContainer />}
    </>
  );
}

export default App;
