/*
 * @file Utility functions for the map
 *
 * @author Sumit Chaturvedi
 */
import { neighbors, edges } from "./graphOps";
import { v4 as uuidv4 } from "uuid";
import { randomSelect } from "./randomOps";
import { uniq } from "lodash";

function featuredGeometry(geometry) {
  let base = {
    type: "Feature",
    properties: {}
  };
  if (typeof geometry === "undefined") {
    base = {
      geometry: {
        type: "Point",
        coordinates: [0, 0]
      },
      ...base
    };
  } else {
    base = { geometry, ...base };
  }
  return base;
}

function interpolate(p1, p2, t) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const x = x1 * (1 - t) + x2 * t;
  const y = y1 * (1 - t) + y2 * t;
  return [x, y];
}

function clamp(x, [l, h]) {
  return Math.max(Math.min(x, h), l);
}

class ReachableLayer {
  constructor({ map, graph }) {
    this.map = map;
    this.graph = graph;
    this.sources = [];
    this.layers = [];
  }

  _visualize = link => {
    const sId = uuidv4();
    const lId = uuidv4();
    this.sources.push(sId);
    this.layers.push(lId);
    this.map.addSource(sId, {
      type: "geojson",
      data: featuredGeometry(link.route)
    });
    this.map.addLayer({
      id: lId,
      type: "line",
      source: sId,
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#00FF00",
        "line-width": 7
      }
    });
  };

  show = node => {
    const seen = [];
    const dfs = source => {
      seen.push(source);
      const nbrs = uniq(
        neighbors(this.graph, source).filter(target => !seen.includes(target))
      );
      const links = nbrs.map(target =>
        randomSelect(edges(this.graph, { source, target }))
      );
      links.map(this._visualize);
      nbrs.map(dfs);
    };
    dfs(node);
  };

  hide = () => {
    this.layers.map(this.map.removeLayer);
    this.sources.map(this.map.removeSource);
  };
}
export { featuredGeometry, interpolate, clamp, ReachableLayer };
