import React from "react";

function Music() {
  return (
    <div className="about">
      {/* <section class="features-icons text-center det-ails"> */}
      <div className="sound-container text-left">
        <div className="row">
          <div className="col-lg-6">
            <p className="talk">
              <h2>Sound Archive</h2>
              <br />
              <br />
              <h5 className="bold-four">Sound Album</h5>
              <br />
              The 201 sound album is a compilation of the 41 recordings that
              were taken between October 2020 to February 2021 for the 201 Bus
              Project. The tracks in the album are categories of sounds that
              were commonly found in the buses such as ringtones, traffic, songs
              etc.
            </p>
          </div>
          <div className="col-lg-4 ">
            <div className="">
              <div className="sound-page-button soundcloud-button">
                <a
                  className="soundpage-btn-a"
                  href="https://soundcloud.com/rukmini-swaminathan/sets/201buses"
                >
                  <i className="icon-social-soundcloud"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="row col-lg-6">
          <p>To hear the longer recordings:</p>
          <br />
          <br />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <p>
              <h5 className="bold-four">Bus stops</h5>
              <br />
              There are 25 bus stop recordings in this folder. The recordings
              are of some of the main bus stops in the 201 bus route such as
              Jeevan Bhima Nagar, Banashankari, Hampinagar, Srinagar,
              Padmanabhanagar, Madiwala.{" "}
            </p>
          </div>
          <div className="col-lg-4">
            <div className="sound-page-button">
              <a
                className="soundpage-btn-a"
                href="https://drive.google.com/drive/folders/1nklaTVdsE-ZOOMZzTOm1Hsc9WkokESsy?usp=sharing"
              >
                <i className="icon-location-pin"></i>
              </a>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-lg-6">
            <p>
              <h5 className="bold-four">Bus Journey Recordings</h5>
              <br />
              There are 16 recordings in this folder. Of the 16, 1 of them
              belongs to the 500 series and the rest to the 201 bus route. The
              eight 201 buses recorded are 201, 201K, 201M, 201G, 201B, 201C,
              201Q and 201D.
            </p>
          </div>
          <div className="col-lg-4">
            <div className="sound-page-button">
              <a
                className="soundpage-btn-a"
                href="https://drive.google.com/drive/folders/1l4rrbEZ8cDkiZHRtmOodcTsS5g9zQCeZ?usp=sharing"
              >
                <i className="icon-directions"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
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
      {/* </section> */}
    </div>
  );
}

export default Music;
