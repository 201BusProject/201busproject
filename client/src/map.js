import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./css/Mapload.css";
import AnecdoteModal from "./AnecdoteModal";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { ZoomControl } from "mapbox-gl-controls";
import graph from "./data/connectivity";
import Node from "./node";
import Segment from "./segment";
import { showRoute, hideRoute } from "./utils/geoOps";
import { randomRoute, getNodeIdxById } from "./utils/graphOps";
import StatusBar from "./StatusBar";
import Tooltip from "./tooltip";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhbm1hbjExMTAiLCJhIjoiY2trdmg3dDNqMjBidTJ1czFjZnJhdXczbCJ9.iiySDdrwpE0p-hFUAKtU7Q";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Pick any bus stop as source.",
      bus: undefined,
      latLng: [77.5985, 12.9433],
      zoom: 12.3,
      graph: graph,
      journeyPaused: false
    };
    this.mapContainerRef = React.createRef();
    this.tooltipRef = new mapboxgl.Popup({ offset: 15 });
    this.source = undefined;
    this.canHandleNodes = true;
    this.busStarted = false;
    this.beforeId = graph.nodes[0].id;
  }

  runJourney = () => {
    const { graph } = this.state;
    // Get a sequence of links from source to target.
    const links = randomRoute(graph, {
      source: this.source,
      target: this.target
    });
    showRoute(this.map, links, this.beforeId);
    // chain them.
    if (links.length > 0) {
      this.canHandleNodes = false;
      this.segments = links.map(
        link => new Segment({ map: this.map, link }, this.beforeId)
      );
      this.segments.slice(0, this.segments.length - 1).map((seg, i) => {
        return seg.onEnd(() => {
          this.busStarted = false;
          this.setState({ bus: undefined });
          this.targetStop = this.nodes[getNodeIdxById(graph, seg.link.target)];
          this.targetStop.onBegin(() =>
            this.setState({ status: `Waiting at ${seg.link.target}` })
          );
          this.targetStop.onEnd(() => {
            this.segments[i + 1].beginAnimate();
          });
          this.targetStop.beginAnimate();
        });
      });
      this.segments[this.segments.length - 1].onEnd(() => {
        this.endJourney();
      });
      this.segments.map(seg =>
        seg.onBegin(() => {
          this.busStarted = true;
          this.setState({
            bus: seg.link.bus,
            status: `Starting journey on bus ${seg.link.bus}`
          });
        })
      );
      this.sourceStop = this.nodes[getNodeIdxById(graph, this.source)];
      this.sourceStop.onBegin(() =>
        this.setState({ status: `Waiting at ${this.source} ...` })
      );
      this.sourceStop.onEnd(() => this.segments[0].beginAnimate());
      this.sourceStop.beginAnimate();
    }
    this.source = undefined;
  };

  pauseJourney = () => {
    if (!this.canHandleNodes) {
      this.setState(function(prevState, props) {
        return { journeyPaused: !prevState.journeyPaused };
      });
      this.segments.map(seg => seg.pauseOrRestartAnimate());
      this.nodes.map(node => node.pauseOrRestartAnimate());
    }
  };

  endJourney = () => {
    this.segments.map(seg => seg.cancelAnimate());
    this.nodes.map(node => node.cancelAnimate());
    hideRoute(this.map);
    this.setState({
      status: "Pick any bus stop as source.",
      journeyPaused: false,
      bus: undefined
    });
    this.canHandleNodes = true;
  };

  handleNodeClick = node => {
    if (this.canHandleNodes) {
      if (typeof this.source === "undefined") {
        this.source = node.id;
        this.setState({ status: "Pick another bus stop as destination." });
      } else {
        this.target = node.id;
        this.runJourney();
      }
    }
  };

  componentDidMount() {
    const { latLng, zoom, graph } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: "mapbox://styles/pranman1110/ckky1iti20m1l17n5swewr7m3",
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

    this.map.on("mousemove", e => {
      const features = this.map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];
        // Create tooltip node
        const tooltipNode = document.createElement("div");
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        // Set tooltip on map
        this.tooltipRef
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(this.map);
      }
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
    const { bus, status } = this.state;
    return (
      <div className="col">
        <StatusBar
          bus={bus}
          status={status}
          pauseJourney={this.pauseJourney}
          endJourney={this.endJourney}
          journeyPaused={this.state.journeyPaused}
        />
        {bus && <AnecdoteModal bus={bus} />}
        <div className="map-container" ref={this.mapContainerRef} />
      </div>
    );
  }
}

export default Map;
