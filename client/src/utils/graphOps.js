/*
 * @file Utility functions for connectivity graph
 *
 * @author Sumit Chaturvedi
 */
import { randomSelect } from "./randomOps";
import { uniq, zip } from "lodash";

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

function randomRoute(graph, { source, target }) {
  const seen = [];
  const pathNodes = [];
  const dfs = s => {
    seen.push(s);
    if (s === target) {
      pathNodes.push(s);
      return true;
    }
    const nbrs = neighbors(graph, s).filter(t => !seen.includes(t));
    const isTherePaths = nbrs.map(dfs);
    return isTherePaths.some(x => x) && pathNodes.push(s);
  };
  dfs(source);
  pathNodes.reverse();
  const pairs = zip(pathNodes, pathNodes.slice(1));
  return pairs
    .map(([source, target]) => randomSelect(edges(graph, { source, target })))
    .slice(0, pathNodes.length - 1);
}

export { neighbors, reachable, edges, randomRoute };
