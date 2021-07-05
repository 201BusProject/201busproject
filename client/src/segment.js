/* 
 * @file Component represents a segment between adjacent bus stops
 *
 * @author Sumit Chaturvedi
 */ 

class Segment {
  constructor({map, route, busNo, audio}) {
    this.map = map;
    this.route = route;
    this.busNo = busNo;
    this.audio = audio;
    this.paused = true;
  }

  updateAnimation = () => {
  }

  beginAnimate = () => {
    this.paused = false;
    this.audio.currentTime = 0;
    this.posId = 0;
    this.audioPromise = this.audio.play();
    // FIXME: audio promise may be undefined on some browsers.
    this.audioPromise.then(() => {
      this.rAF = requestAnimationFrame(this.updateAnimation);
    });
  }

  pauseAnimate = () => {
    if (this.paused) return;
    this.paused = true;
    this.audioPromise.then(() => {
      this.audio.pause();
      cancelAnimationFrame(this.rAF);
    })
  }

  restartAnimate = () => {
    if (!this.paused) return;
    this.paused = true
    this.audioPromise = this.audio.play()
    this.audioPromise.then() => {
      this.rAF = requestAnimationFrame(this.updateAnimation);
    }
  }

};

export default Segment;
