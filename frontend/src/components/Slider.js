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
  infinite: true,
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

const slider = React.memo((props) => {
  let selectedClientsToSlider;
  selectedClientsToSlider = (
    <Slider {...settings}>
      {props.selected_clients.map((item) => {
        return (
          <SendCommand
            key={item.client_Session_ID}
            client_ID={item.client_ID}
            client_Session_ID={item.client_Session_ID}
            socket={props.socket}
            globalCommand={props.globalCommand}
          />
        );
      })}
    </Slider>
  );

  return <div className="">{selectedClientsToSlider}</div>;
});

export default slider;
