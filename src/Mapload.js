import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { ZoomControl } from "mapbox-gl-controls";
import "./css/Mapload.css";
import * as turf from "@turf/turf";
import "./css/Modal.css";
import AnecdoteModal from "./AnecdoteModal";
import buslayout from "./utils/buslayout";
import ReactDOM from 'react-dom';
import Popup from "./Popup";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhbm1hbjExMTAiLCJhIjoiY2trdmg3dDNqMjBidTJ1czFjZnJhdXczbCJ9.iiySDdrwpE0p-hFUAKtU7Q";

const bangalore = [77.5985813140869, 12.943333543267157];
const zoom = 12.5;

const Mapload = () => {
  const mapContainerRef = useRef(null);
  const popupRef = useRef(new mapboxgl.Popup());

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/pranman1110/ckljhzuuy0ibx17qo8ulkjx1m",
      center: bangalore,
      zoom: zoom
    });

    // Based on :
    // https://github.com/mapbox/mapbox-react-examples/blob/master/react-tooltip/src/Map.js
    map.on("mouseenter", e => {
      if (e.feature.length) {
        map.getCanvas().style.cursor = "pointer";
      }
    });

    map.on("mouseleave", () => {
      map.getCanvas().style.cursor = "";
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new ZoomControl(), "top-right");

    map.on("load", function() {

      map.addSource("busstops", {
        type: "geojson",
        data: "https://pranman11.github.io/bus-data/busstops.geojson"
      });

      map.addLayer({
        id: "busstops",
        source: "busstops",
        type: "symbol",
        layout: {
          "icon-size": 2.5,
          ...buslayout
        }
      });

      map.on("click", "busstops", e => {
        const popupNode = document.createElement("div")
        ReactDOM.render(<Popup busEvent={e} />, popupNode);
        popupRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(popupNode)
          .addTo(map);
      });

    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Mapload;
