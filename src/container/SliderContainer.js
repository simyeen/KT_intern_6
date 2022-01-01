import React from "react";
import Slider from "react-slick";

import styled from "styled-components";

export default function SimpleContainer() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Container>
      <Slider className="Slider" {...settings}>
        <div>1</div>
        <div>2</div>
      </Slider>
    </Container>
  );
}

const Container = styled.div`
  width: "80%";
`;
