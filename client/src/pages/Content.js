import React from "react";
import "./style.css";
import "./landing-page.css";

function Content(props) {
  const { onClick } = props;

  return (
    <div>
      <div className="content">
        <div className="row">
          <div className="col-sm-9 talk text-left">
            <h1>201 BUS PROJECT</h1>
            <br />
            <br />
            <br />
            <h6>
            Having witnessed the stillness of Bangalore during lockdown in 2020, the 201 Bus Project began as a  means to archive 
            the movement of the city by recording the sounds of the BMTC buses.
            They  were used  to create a sound map and sound album as means to  navigate the boundaries 
            between personal and shared, familiar and unfamiliar and create a sense of togetherness while being apart as we experience the pandemic. 
            </h6>
            <br />
            <h6>
            The 201 buses pass through the east and south of Bangalore. There are approximately 25 bus routes under the 201 series. 
            Due to the constraints caused by the pandemic only 8 routes of the 201 series were recorded. 
            The recordings were taken through the course of October 2020 to February 2021. 
            </h6>
            <br />
            <p>
            If you want to collaborate or contribute to mapping the sounds of Bangalore please get in touch via email. rukmini.swaminathan@gmail.com
            </p>
            <br />
            <br />
            <h6>
            <div onClick={() => onClick("map")}>
                <p className="btn btn-dark start start-two">Catch a 201</p>
              </div>
            </h6>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="text-left col-sm-9">
            <p className="names"> 
              Sound Recordings: Rukmini Swaminathan
              <br />
              Illustrations: Arun Swaminathan
              <br />
              Website: Pranav Manglani, Sumit Chaturvedi
              <br/>
              <br />
              This project is made possible with a grant from India Foundation for the Arts, under the Project 560 Programme.
            </p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          <div className="col-sm-3">
            <img src={`/assets/IFA_logo_white.png`} alt="IFA" className="logo"/> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
