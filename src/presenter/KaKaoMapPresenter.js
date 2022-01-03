import React from "react";
import styled from "styled-components";

const KaKaoMapPresenterBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: right;
`;

const Row = styled.div`
  text-align: right;
`;

const KaKaoMapPresenter = ({ closestPlace }) => {
  const { place_name, address_name, road_address_name } = closestPlace;

  return (
    <KaKaoMapPresenterBlock>
      <Title>{place_name}</Title>
      <Row>주소명 {address_name}</Row>
      {road_address_name && <Row>도로명 주소 {road_address_name}</Row>}
      <Row>걸리는 시간 대충 몇분</Row>
      <Row>거리 대충 몇키로 km</Row>
    </KaKaoMapPresenterBlock>
  );
};

export default KaKaoMapPresenter;
