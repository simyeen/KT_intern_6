import React from "react";
import styled from "styled-components";

const KaKaoMapPresenterBlock = styled.div``;

const Title = styled.div``;

const row = styled.div``;

const KaKaoMapPresenter = ({ data }) => {
  const { place_name, address_name, road_address_name } = data;

  return <KaKaoMapPresenterBlock>{address_name}</KaKaoMapPresenterBlock>;
};

export default KaKaoMapPresenter;
