import React from "react";
import styled from "styled-components";
import color from "../common/color";
import Text from "../common/Text";

const KaKaoMapPresenterBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledText = styled(Text)`
  text-align: right;
  font-size: 1.4rem;
  line-height: 1.1;
`;

const DisText = styled.span`
  font-size: 1.3rem;
  line-height: 1.1;
`;

const TimeText = styled.span`
  color: ${color.KT_blue};
  font-weight: 1000;
  font-size: 1.8rem;
  line-height: 1.4;
`;

const KaKaoMapPresenter = ({ closestPlace }) => {
  const { place_name, address_name } = closestPlace;

  return (
    <KaKaoMapPresenterBlock>
      <Text fontSize={25} fontWeight={700}>
        {place_name}
      </Text>
      <StyledText>{address_name}</StyledText>
      <StyledText>
        소요시간 <TimeText>12분</TimeText>
      </StyledText>
    </KaKaoMapPresenterBlock>
  );
};

export default KaKaoMapPresenter;
