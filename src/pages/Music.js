import React from 'react'
import Footer from './Footer'
 
function Music() {
    return (
        <div className="about">
            {/* <section class="features-icons text-center det-ails"> */}
                <div class="sound-container features-icons text-left">
                    <div class="row">
                        <div class="col-lg-6">
                            <p className="talk"><h2>Sound Album</h2><br/>The 201 sound album is a compilation of the 41 recordings that were taken between October 2020 to February 2021 for the 201 Bus Project. The tracks in the album  are categories of sounds that were commonly found in the buses such as ringtones, traffic, songs etc.</p>
                        </div>
                        <div class="col-lg-4 ">
                            <div class="features-icons-item soundcloud-button">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <a class="" href="https://soundcloud.com/rukmini-swaminathan/sets/201buses">
                                        <i class="icon-social-soundcloud m-auto text-primary icon-ails"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div class="row col-lg-6">
                        <p>To hear the longer recordings:</p><br /><br />
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <p><h5>Bus stops</h5><br/>There are 25 bus stop recordings in this folder.  The recordings  are of  some of the main bus stops in the 201 bus route such as Jeevan Bhima Nagar, Banashankari, Hampinagar, Srinagar, Padmanabhanagar, Madiwala. </p>
                        </div>
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <a class="lead mb-0" href="https://drive.google.com/drive/folders/1nklaTVdsE-ZOOMZzTOm1Hsc9WkokESsy?usp=sharing">
                                        <i class="icon-location-pin m-auto text-primary icon-ails"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <p><h5>Bus Journey Recordings</h5><br/>There are 16 recordings in this folder. Of the 16, 1 of them belongs to the 500 series and the rest to the 201 bus route. The eight 201 buses recorded are 201, 201K, 201M, 201G, 201B, 201C, 201Q and 201D.</p>
                        </div>
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                <a class="lead mb-0" href="https://drive.google.com/drive/folders/1l4rrbEZ8cDkiZHRtmOodcTsS5g9zQCeZ?usp=sharing">
                                    <i class="icon-directions m-auto text-primary icon-ails"></i>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </section> */}
            <Footer />
        </div>
        
    )
}
 
export default Music