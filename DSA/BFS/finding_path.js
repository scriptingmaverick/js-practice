const bfs = (nodes) => {
  const queue = [Object.keys(nodes)[0]];
  nodes[queue[0]].state = 2;
  const traversalOrder = [];
  while (queue.length > 0) {
    const key = queue.shift();
    traversalOrder.push(key);
    for (const neighbour of nodes[key].adjacentNodes) {
      if (!nodes[neighbour]) nodes[neighbour] = { adjacentNodes: [], state: 0 };
      if (nodes[neighbour].state === 0) {
        nodes[neighbour].state = 2;
        queue.push(neighbour);
      }
    }
  }

  return traversalOrder;
};

const pushToNode = (nodes, u, value) => {
  nodes[u] = nodes[u] || { adjacentNodes: [], state: 0 };
  nodes[u].adjacentNodes.push(value);
};

const findPath = (graph) => {
  const nodes = {};
  for (const [u, v] of graph) {
    pushToNode(nodes, u, v);
  }

  return bfs(nodes);
};

console.log(
  findPath([
    ["a", "b"],
    ["a", "d"],
    ["b", "c"],
    ["d", "c"],
    ["d", "e"],
    ["c", "f"],
    ["e", "f"],
  ])
);
