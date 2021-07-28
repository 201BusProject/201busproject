import React from "react";

function Music() {
  return (
    <div className="about col">
      <div className="row">
        <div className="col talk aboutText text-left">
          <h2>Sound Archive</h2>
          <div className="row">
            <div className="col">
              <h5 className="bold talk">Sound Album</h5>
              <p className="talk">
                The 201 sound album is a compilation of the 41 recordings that
                were taken between October 2020 to February 2021 for the 201 Bus
                Project. The tracks in the album are categories of sounds that
                were commonly found in the buses such as ringtones, traffic,
                songs etc.
              </p>
            </div>
            <div className="col">
              <div className="sound-page-button">
                <a
                  className="soundpage-btn-a"
                  href="https://soundcloud.com/rukmini-swaminathan/sets/201buses"
                >
                  <i className="icon-social-soundcloud"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5 className="bold talk">Bus stops</h5>
              <p className="talk">
                There are 25 bus stop recordings in this folder. The recordings
                are of some of the main bus stops in the 201 bus route such as
                Jeevan Bhima Nagar, Banashankari, Hampinagar, Srinagar.
              </p>
              <br />
            </div>
            <div className="col">
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
          <div className="row">
            <div className="col">
              <h5 className="bold talk">Bus Journey Recordings</h5>
              <p className="talk">
                There are 16 recordings in this folder. Of the 16, 1 of them
                belongs to the 500 series and the rest to the 201 bus route. The
                eight 201 buses recorded are 201, 201K, 201M, 201G, 201B, 201C,
                201Q and 201D.
              </p>
              <br />
            </div>
            <div className="col">
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
      </div>
    </div>
  );
  /**    <div className="row col-lg-6">
        <br />
        <br />
      </div>
      <br />
      <br />
    </div>
  ); */
}

export default Music;
