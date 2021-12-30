import axios from "axios";
import React, { useState } from "react";
import HeaderContainer from "./container/HeaderContainer";
import InfoContainer from "./container/InfoContainer";
import TeamContainer from "./container/TeamContainer";
import HomePage from "./page/HomePage";

function App() {
  const [postList, setPostList] = useState(0);

  const handleSubmit = async () => {
    try {
      await axios.get("url", { params: postList });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <HeaderContainer {...{ setPostList }} />
      {postList === 0 && <HomePage />}
      {postList === 1 && <InfoContainer />}
      {postList === 2 && <TeamContainer />}
      <button>KT OPEN API</button>
    </>
  );
}

export default App;
