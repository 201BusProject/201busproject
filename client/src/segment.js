/*
 * @file A segment between adjacent bus stops
 *
 * @author Sumit Chaturvedi
 */
import buslayout from "./utils/buslayout";
import colors from "./utils/busColors";
import { featuredGeometry, interpolate, clamp } from "./utils/geoOps";
import * as turf from "@turf/turf";

class Segment {
  constructor({ map, link }) {
    this.map = map;
    this.link = link;
    const { source, target, bus } = link;
    this.busId = `movingBus-${source}-${target}-${bus}`;
    this.routeId = `route-${source}-${target}-${bus}`;
    const url = `/audio/edges/${bus}/${source}-${target}/audio.mp3`;
    this.audio = new Audio(url);
    this.beginFn = () => {};
    this.endFn = () => {};
  }

  onEnd = fn => {
    this.endFn = fn;
  };

  onBegin = fn => {
    this.beginFn = fn;
  };

  updateAnimation = () => {
    const { duration, currentTime, ended } = this.audio;
    if (ended) {
      cancelAnimationFrame(this.rAF);
      this._removeSourceAndLayer();
      this.endFn();
      return;
    }
    const { route } = this.link;
    const { coordinates } = route;
    const { length } = coordinates;
    const fraction = currentTime / duration;
    const routeFraction = length * fraction;
    const id = Math.floor(routeFraction);
    const fp = routeFraction % 1;
    const prev = coordinates[clamp(id, [0, length - 1])];
    const next = coordinates[clamp(id + 1, [0, length - 1])];
    let point = interpolate(prev, next, fp);
    point = featuredGeometry({
      type: "Point",
      coordinates: point
    });
    point.properties.bearing = turf.bearing(turf.point(prev), turf.point(next));
    this.map.getSource(this.busId).setData(point);
    this.rAF = requestAnimationFrame(this.updateAnimation);
  };

  beginAnimate = () => {
    if (this.audio.paused) {
      this.audio.currentTime = 0;
      this.posId = 0;
      this.audioPromise = this.audio.play();
      this._addSourceAndLayer();
      this.audioPromise.then(() => {
        this.rAF = requestAnimationFrame(this.updateAnimation);
      });
      this.beginFn();
    }
  };

  _addSourceAndLayer = () => {
    this.map.addSource(this.busId, {
      type: "geojson",
      data: featuredGeometry()
    });
    this.map.addSource(this.routeId, {
      type: "geojson",
      data: featuredGeometry(this.link.route)
    });
    this.map.addLayer({
      id: this.routeId,
      type: "line",
      source: this.routeId,
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": colors[this.link.bus],
        "line-width": 7
      }
    });
    this.map.addLayer({
      id: this.busId,
      source: this.busId,
      type: "symbol",
      layout: {
        "icon-size": 2,
        ...buslayout
      }
    });
    this.map.addLayer({
      "id": "busNo-"+this.routeId,
      "type": "symbol",
      "source": this.routeId,
      "maxzoom": 18,
      "minzoom": 2,
      "layout": {
        "symbol-placement": "line",
        "text-font": ["Open Sans Regular"],
        "text-field": this.link.bus,
        "text-size": 20
      },
      "paint": {
        "text-color": "#202",
        "text-halo-color": "#fff",
        "text-halo-width": 2
      }
    });
    console.log(this.map.getSource(this.routeId));
    this.map.on("click", this.busId, () => {
      if (this.audio.paused) {
        this.restartAnimate();
      } else {
        this.pauseAnimate();
      }
    });
  };

  _removeSourceAndLayer = () => {
    this.map.removeLayer(this.busId);
    this.map.removeLayer(this.routeId);
    this.map.removeSource(this.busId);
    this.map.removeSource(this.routeId);
  };

  pauseAnimate = () => {
    if (this.audio.paused) return;
    this.audioPromise.then(() => {
      this.audio.pause();
      cancelAnimationFrame(this.rAF);
    });
  };

  restartAnimate = () => {
    if (!this.audio.paused) return;
    this.audioPromise = this.audio.play();
    this.audioPromise.then(() => {
      this.rAF = requestAnimationFrame(this.updateAnimation);
    });
  };
}

export default Segment;
