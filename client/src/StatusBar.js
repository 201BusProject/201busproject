import React from "react";
import { range } from "lodash";
import "./css/StatusBar.css";
import * as FaIcons from "react-icons/fa";
import Slider from "react-slick";

function StatusBar(props) {
    const { status, bus } = props;
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
      <div  className = "status-bar">
        <div className = "status col-lg-9">
            <h6 className="bold-four">{status}</h6>
        </div>
        <div className = "status-btn col-sm-2">
          <button className = "btn btn-dark start start-two">
            <FaIcons.FaUndo />
          </button>
          <button className = "btn btn-dark start start-two">
            <FaIcons.FaPause />
          </button>
        </div>
        {/* <div className="busstops-slider">
          <Slider {...settings}>
            {range(1, 9).map(function(id) {
              return (
                <div className="slide" key={id}>
                  <h6> bus-stop names</h6>
                </div>
              );
            })}
          </Slider>
        </div> */}
      </div>
    );
}

export default StatusBar;
