import React, { useEffect } from "react";
import styled from "styled-components";
import color from "../common/color";
import Text from "../common/Text";
import Speak from "../container/Speak";
import speakDestination from "../util/speakDestination";

const KaKaoMapPresenterBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledText = styled(Text)`
  text-align: right;
  font-size: 1.4rem;
  line-height: 1.1;
`;

const TimeText = styled.span`
  color: ${color.KT_blue};
  font-weight: 1000;
  font-size: 1.8rem;
  line-height: 1.4;
`;

const KaKaoMapPresenter = ({ closestPlace, closestDistance, isEventOn }) => {
  const { place_name, address_name } = closestPlace;

  useEffect(() => {
    console.log("알림 정보 표시", isEventOn);
    // speakDestination({
    //   text: address_name,
    // });
  }, []);

  return (
    <KaKaoMapPresenterBlock>
      <Text fontSize={25} fontWeight={700} textAlign="right">
        {place_name}
      </Text>
      <StyledText>{address_name}</StyledText>
      <StyledText>
        예측거리 <TimeText>{closestDistance.toFixed(1)} </TimeText>km
      </StyledText>
    </KaKaoMapPresenterBlock>
  );
};

export default KaKaoMapPresenter;
