import React from "react";
import Slider from "react-slick";

import SendCommand from "./SendCommand";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#00d1b2" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#00d1b2" }}
      onClick={onClick}
    />
  );
}

// Settings for Slider
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  accessibility: true,
  swipeToSlide: true,
  centerMode: true,
  centerPadding: "0px",
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const selectClient = (props) => {
  return (
    <div className="container">
      <Slider {...settings}>
        <div>
          <SendCommand sessionID={props.selected_clients[0]} />
        </div>
      </Slider>
    </div>
  );
};

export default selectClient;
