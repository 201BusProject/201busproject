import React from "react";
import { range } from "lodash";
import "./css/AnecdoteModal.css";
import Slider from "react-slick";

function AnecdoteModal(props) {
  const { bus } = props;
  if (props.bus) {
    var settings = {
      arrows: true,
      centreMode: true,
      centerPadding: "20%",
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="group-4">
        <div className="slider">
          <Slider {...settings}>
            {range(1, 9).map(function(id) {
              return (
                <div className="slide" key={id}>
                  <img src={`/assets/bus-booklets/${bus}/${id}.jpg`} />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h3>bus number is null</h3>
      </div>
    );
  }
}

export default AnecdoteModal;
