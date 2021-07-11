import React from "react";
import "./style.css";
import "./landing-page.css";
import { Link } from "react-router-dom";

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
            <h6 className="bold-four">
              Having witnessed the stillness of Bangalore during lockdown in
              2020, the 201 Bus Project began as a means to archive the movement
              of the city by recording the sounds of the BMTC buses. The
              project, funded by the{" "}
              <a href="https://indiaifa.org/programmes/project-560.html">
                India Foundation for Arts (IFA) 560 grant
              </a>
              , records the sounds of the 201 bus series. These sounds were used
              to create a sound map and sound album. By using the medium of
              sound, this project seeks to navigate the boundaries between
              personal and shared, familiar and unfamiliar and create a sense of
              togetherness while being apart as we experience the pandemic. The
              201 buses pass through the east and south of Bangalore. There are
              approximately 25 bus routes under the 201 series. Due to the
              constraints caused by the pandemic only 8 routes of the 201 series
              were recorded. The recordings were taken through the course of
              October 2020 to February 2021.
            </h6>
            <br />
            <p className="bold-four">
              If you want to collaborate or contribute to mapping the sounds of
              Bangalore please get in touch via email.
              rukmini.swaminathan@gmail.com
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
