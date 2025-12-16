const bfs = (nodes) => {
  const CPRealtions = {};
  const queue = [Object.keys(nodes)[0]];
  nodes[queue[0]].state = 2;
  CPRealtions[queue[0]] = { parent: null, distance: 0 };
  const traversalOrder = [];
  while (queue.length > 0) {
    const key = queue.shift();
    traversalOrder.push(key);
    for (const neighbour of nodes[key].adjacentNodes) {
      if (!nodes[neighbour]) nodes[neighbour] = { adjacentNodes: [], state: 0 };
      if (nodes[neighbour].state === 0) {
        CPRealtions[neighbour] = {
          parent: key,
          distance: CPRealtions[key].distance + 1,
        };
        nodes[neighbour].state = 2;
        queue.push(neighbour);
      }
    }
  }

  return [traversalOrder, CPRealtions];
};

const pushToNode = (nodes, u, value) => {
  nodes[u] = nodes[u] || { adjacentNodes: [], state: 0 };
  nodes[u].adjacentNodes.push(value);
};

export const findPath = (graph, findMinPath = false) => {
  const nodes = {};
  for (const [u, v] of graph) {
    pushToNode(nodes, u, v);
  }

  const [traversalOrder, CPRealtions] = bfs(nodes);
  return !findMinPath ? traversalOrder : [CPRealtions, nodes];
};

const findMinPath = (graph, destinationNode = "f") => {
  const CPRealtions = findPath(graph, true)[0];
  let node = destinationNode;
  const path = [];
  while (node !== null) {
    path.unshift(node);
    node = CPRealtions[node].parent;
  }

  return path;
};

findPath([
  ["a", "b"],
  ["a", "d"],
  ["b", "c"],
  ["d", "c"],
  ["d", "e"],
  ["c", "f"],
  ["e", "f"],
]);
findMinPath(
  [
    ["a", "b"],
    ["a", "d"],
    ["b", "c"],
    ["d", "c"],
    ["d", "e"],
    ["c", "f"],
    ["e", "f"],
  ],
  "f",
);
findMinPath(
  [
    ["a", "b"],
    ["a", "c"],
    ["b", "d"],
    ["c", "d"],
    ["b", "e"],
    ["d", "e"],
  ],
  "e",
);
findMinPath(
  [
    ["a", "c"],
    ["b", "c"],
    ["c", "d"],
  ],
  "d",
);
