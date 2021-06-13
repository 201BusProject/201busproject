import React from 'react';
import './AnecdoteModal.css';
import ImagesMap from './ImagesData'
import Slider from "react-slick";
 
function AnecdoteModal(props) {
  var imagesUrl = [0];
  if(props.busNo != null && ImagesMap.get(props.busNo)){
    imagesUrl = ImagesMap.get(props.busNo);
    var settings = {
      // variableWidth: true,
      arrows: true,
      centreMode: true,
      centerPadding: '20%',
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="group-4">
        {/* <div className="overlap-group rectangleAnecdote"> */}
          {/* <img
            className="img-20210213-wa0006-1"
            src="img-20210213-wa0006-1.png"
          /> */}
          {/* <Group8 /> */}
          <div className = "slider">
          <Slider {...settings}>
            {
            imagesUrl.map(function(url, i){
              return <div className = "slide" key = {i}>
                <img src={url}/>
              </div>
              }) 
            }
            </Slider>
          </div>
          
        {/* </div> */}
      </div>
    );
  } else {
    return(
      <div>
        <h3>bus number is null</h3>
      </div>
    )
  }
}
 
export default AnecdoteModal;
 
function Group5(props) {
  const { title } = props;
 
  return (
    <div className="group-5">
      <div className="flex-col">
        <div className="flex-row">
          <h1 className="title roboto-black-mercury-40px">{title}</h1>
          <div className="rectangle-2"></div>
        </div>
      </div>
    </div>
  );
}

function Group8() {
  // const { overlapGroup, line7, busStop11228, line8, busStop21229, line9, busStop312210, line10 } = props;
 
  return (
    <div className="group-8">
        <div className="overlap-group rectangleStops">  
      </div>
    </div>
  );
}
