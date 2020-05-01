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

const selectClient = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
    swipeToSlide: true,
    centerMode:true,
    centerPadding : "0px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="container">
      <Slider {...settings}>
        <div>
          <SendCommand />
        </div>
      </Slider>
    </div>
  );
};

export default selectClient;
