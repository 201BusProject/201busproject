import React, { Component } from "react";
import "./css/Mapload.css";
import "./css/Modal.css";
import AnecdoteModal from "./AnecdoteModal";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { ZoomControl } from "mapbox-gl-controls";
import graph from "./data/connectivity";
import Node from "./node";
import Segment from "./segment";
import { showRoute, hideRoute } from "./utils/geoOps";
import { randomRoute } from "./utils/graphOps";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhbm1hbjExMTAiLCJhIjoiY2trdmg3dDNqMjBidTJ1czFjZnJhdXczbCJ9.iiySDdrwpE0p-hFUAKtU7Q";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bus: undefined,
      latLng: [77.5985, 12.9433],
      zoom: 12.5,
      graph: graph
    };
    this.mapContainerRef = React.createRef();
    this.source = undefined;
    this.canHandleNodes = true;
    this.beforeId = graph.nodes[0].id;
  }

  handleNodeClick = node => {
    if (this.canHandleNodes) {
      const { graph } = this.state;
      if (typeof this.source === "undefined") {
        this.source = node.id;
        toast.dark("Pick a destination!", {
          autoClose: false,
        });
      } else {
        this.target = node.id;
        toast.dismiss();
        // Get a sequence of links from source to target.
        const links = randomRoute(graph, {
          source: this.source,
          target: this.target
        });
        showRoute(this.map, links, this.beforeId);
        // chain them.
        if (links.length > 0) {
          this.canHandleNodes = false;
          const segments = links.map(
            link => new Segment({ map: this.map, link }, this.beforeId)
          );
          segments.slice(0, segments.length - 1).map((seg, i) => {
            return seg.onEnd(() => {
              this.setState({ bus: undefined });
              segments[i + 1].beginAnimate();
            });
          });
          segments[segments.length - 1].onEnd(
            () => {
              this.setState({ bus: undefined });
              this.canHandleNodes = true;
              hideRoute(this.map, links);
            }
          );
          segments.map(seg =>
            seg.onBegin(() => this.setState({ bus: seg.link.bus }))
          );
          segments[0].beginAnimate();
        }
        this.source = undefined;
      }
    }
  };

  componentDidMount() {
    const { latLng, zoom, graph } = this.state;
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
      this.nodes = graph.nodes.map(
        node =>
          new Node({
            map: this.map,
            node: node,
            onClick: () => this.handleNodeClick(node)
          })
      );
    });
  }

  render() {
    const { bus } = this.state;
    return (
      <div>
        {bus && (
          <div className="anecdote-modal Show">
            <AnecdoteModal bus={bus} />
          </div>
        )}
        <div className="map-container" ref={this.mapContainerRef} />
        <ToastContainer/>
      </div>
    );
  }
}

export default Map;
