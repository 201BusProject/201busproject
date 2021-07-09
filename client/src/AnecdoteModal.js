import React from "react";
import "./css/AnecdoteModal.css";
import ImagesMap from "./ImagesData";
import Slider from "react-slick";

function AnecdoteModal(props) {
  var imagesUrl = [0];
  if (props.bus != null && ImagesMap.get(props.bus)) {
    imagesUrl = ImagesMap.get(props.bus);
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
            {imagesUrl.map(function(url, i) {
              return (
                <div className="slide" key={i}>
                  <img src={url} />
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
