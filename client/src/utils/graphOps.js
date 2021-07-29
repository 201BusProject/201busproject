/*
 * @file Utility functions for connectivity graph
 *
 * @author Sumit Chaturvedi
 */
import { uniq } from "lodash";
import { FibonacciHeap } from "@tyriar/fibonacci-heap";

function neighbors(graph, node) {
  return uniq(
    graph.links.filter(link => link.source === node).map(link => link.target)
  );
}

function reachable(graph, node) {
  const reached = [];
  const dfs = n => {
    if (reached.includes(n)) {
      return;
    } else {
      reached.push(n);
      neighbors(graph, n).map(dfs);
    }
  };
  dfs(node);
  return reached;
}

function edges(graph, { source, target }) {
  const { links } = graph;
  return links.filter(l => l.source === source && l.target === target);
}

function getNodeIdxById(graph, id) {
  const { nodes } = graph;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) {
      return i;
    }
  }
  return -1;
}

function shortestRoute(graph, { source, target }) {
  const { nodes } = graph;
  const Q = new FibonacciHeap();
  const backLinks = {};
  const distances = {};
  for (let i = 0; i < nodes.length; i++) {
    distances[nodes[i].id] = Infinity;
  }
  distances[source] = 0;
  Q.insert(0, source);
  while (!Q.isEmpty()) {
    const { value } = Q.extractMinimum();
    if (value === target) {
      break;
    }
    const nbrs = neighbors(graph, value);
    for (let i = 0; i < nbrs.length; i++) {
      const options = edges(graph, { source: value, target: nbrs[i] });
      for (let j = 0; j < options.length; j++) {
        const link = options[j];
        const newCost = distances[value] + link.length;
        if (newCost < distances[nbrs[i]]) {
          distances[nbrs[i]] = newCost;
          Q.insert(newCost, nbrs[i]);
          backLinks[nbrs[i]] = link;
        }
      }
    }
  }
  const route = [];
  let ptr = target;
  while (ptr !== source) {
    route.push(backLinks[ptr]);
    ptr = backLinks[ptr].source;
  }
  return route.reverse();
}

export { neighbors, reachable, edges, shortestRoute, getNodeIdxById };
