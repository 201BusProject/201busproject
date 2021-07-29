import React from "react";
import { range } from "lodash";
import "./css/AnecdoteModal.css";
import Slider from "react-slick";

function AnecdoteModal(props) {
  const { bus } = props;
  var settings = {
    arrows: true,
    centreMode: true,
    centerPadding: "20%",
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return (
    <div className="row anecdote-modal">
      <div className="anecdote-group">
        <div className="slider">
          <Slider {...settings}>
            {range(1, 9).map(function(id) {
              return (
                <img
                  key={id}
                  alt="Anecdote"
                  src={`/assets/bus-booklets/${bus}/${id}.jpg`}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default AnecdoteModal;
