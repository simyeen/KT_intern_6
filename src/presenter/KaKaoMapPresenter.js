import React from "react";
import styled from "styled-components";

const KaKaoMapPresenterBlock = styled.div``;

const KaKaoMapPresenter = ({ data }) => {
  const { address_name } = data;
  console.log(data);
  return <KaKaoMapPresenterBlock>{address_name}</KaKaoMapPresenterBlock>;
};

export default KaKaoMapPresenter;
