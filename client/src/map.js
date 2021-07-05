import React, { Component } from "react";
import "./css/Mapload.css";
import "./css/Modal.css";
import AnecdoteModal from "./AnecdoteModal";
import * as turf from "@turf/turf";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { ZoomControl } from "mapbox-gl-controls";
import buslayout from "./utils/buslayout";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhbm1hbjExMTAiLCJhIjoiY2trdmg3dDNqMjBidTJ1czFjZnJhdXczbCJ9.iiySDdrwpE0p-hFUAKtU7Q";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busNo: undefined,
      latLng: [77.5985, 12.9433],
      zoom: 12.5,
      displayMenu: false
    };
    this.mapContainerRef = React.createRef();
  }

  componentDidMount() {
    const { latLng, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: latLng,
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    this.map.addControl(new ZoomControl(), "top-right");

    this.map.on("move", () => {
      const { lng, lat } = this.map.getCenter();
      this.setState({
        zoom: this.map.getZoom().toFixed(2),
        latLng: [lng, lat]
      });
    });

    this.map.on("load", () => {
      this.map.addSource("busStops", {
        type: "geojson",
        data: "/bus-data/busStops.geojson"
      });

      this.map.addLayer({
        id: "busStops",
        source: "busStops",
        type: "symbol",
        layout: {
          "icon-size": 2.5,
          ...buslayout
        }
      });

    });
  }

  render() {
    const { busNo, displayMenu } = this.state;
    return (
      <div>
        {displayMenu && (
          <div className="anecdote-modal Show">
            <AnecdoteModal busNo={busNo} />
          </div>
        )}
        <div className="map-container" ref={this.mapContainerRef} />
      </div>
    );
  }
}

export default Map;
