const dfs = (nodes, u) => {
  if (!(u in nodes)) return false;
  nodes[u].state = 1;
  const state = {
    1: () => true,
    2: () => false,
    0: (v) => dfs(nodes, v),
  };

  for (let v of nodes[u].adjacentNodes) {
    return state[nodes[v].state](v);
  }

  nodes[u].state = 2;
  return false;
};

const pushToNode = (nodes, u, value) => {
  nodes[u] = nodes[u] || { adjacentNodes: [], state: 0 };
  nodes[u].adjacentNodes.push(value);
};

const checkCycle = (graph, startNode) => {
  const nodes = {};
  for (const [u, value] of graph) {
    pushToNode(nodes, u, value);
  }

  return dfs(nodes, startNode);
};

console.log(
  checkCycle([["1", "2"], ["2", "3"], ["3", "1"], ["3", "4"]], "1"),
);

console.log(
  checkCycle([["1", "2"], ["2", "3"], ["3", "5"], ["5", "4"], ["4", "6"]], "1"),
);

console.log(
  checkCycle([["1", "2"], ["2", "3"], ["3", "4"], ["4", "2"]], "1"),
);
