/*
 * @file Represent one node in the map.
 *
 * @author Sumit Chaturvedi
 */
import buslayout from "./utils/buslayout";
import { featuredGeometry } from "./utils/geoOps";

class Node {
  constructor({ map, node, onClick, onHover }) {
    this.map = map;
    this.node = node;
    this.onClick = onClick;
    this.onHover = onHover;
    this.add2Map();
    const url = `/audio/nodes/${node.id}.mp3`;
    this.audio = new Audio(url);
    this.beginFn = () => {};
    this.endFn = () => {};
    this.ongoing = false;
  }

  onEnd = fn => {
    this.endFn = fn;
  };

  onBegin = fn => {
    this.beginFn = fn;
  };

  beginAnimate = () => {
    this.beginFn();
    this.audio.currentTime = 0;
    this.audioPromise = this.audio.play();
    this.audioPromise.then(() => {
      this.ongoing = true;
    });
    this.audio.onended = () => {
      this.endFn();
      this.ongoing = false;
    };
  };

  cancelAnimate = () => {
    if (!this.ongoing) {
      return;
    } else {
      this.audioPromise.then(() => {
        this.audio.pause();
        cancelAnimationFrame(this.rAF);
        this.ongoing = false;
      });
    }
  };

  pauseOrRestartAnimate = () => {
    if (this.ongoing) { 
      if (this.audio.paused) {
        this.audioPromise = this.audio.play();
      } else {
        this.audioPromise.then(() => {
          this.audio.pause();
        });
      }
    }
  };

  add2Map = () => {
    this.map.addSource(this.node.id, {
      type: "geojson",
      data: featuredGeometry(this.node.location)
    });
    this.map.addLayer({
      id: this.node.id,
      source: this.node.id,
      type: "symbol",
      layout: {
        "icon-size": 2.5,
        ...buslayout
      }
    });
    this.map.on("click", this.node.id, this.onClick);
    this.map.on("mousemove", this.node.id, this.onHover);
  }
}

export default Node;
