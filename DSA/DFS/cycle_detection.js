const dfs = (nodes, u) => {
  nodes[u].state = 1;
  const state = {
    1: () => true,
    2: () => false,
    0: (v) => {
      if (dfs(nodes, v)) return true;
    },
  };

  for (const v of nodes[u].adjacentNodes) {
    if (!(v in nodes)) return false;
    if (state[nodes[v].state](v)) return true;
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

const checkForTopologicalSort = (graph, startNode) =>
  !checkCycle(graph, startNode);

console.log(
  checkCycle(
    [
      ["1", "2"],
      ["2", "3"],
      ["3", "1"],
      ["3", "4"],
    ],
    "1"
  )
);

console.log(
  checkCycle(
    [
      ["1", "2"],
      ["2", "3"],
      ["3", "5"],
      ["5", "4"],
      ["4", "6"],
    ],
    "1"
  )
);

console.log(
  checkCycle(
    [
      ["1", "2"],
      ["2", "3"],
      ["3", "4"],
      ["4", "2"],
    ],
    "1"
  )
);
console.log(
  checkForTopologicalSort(
    [
      ["1", "2"],
      ["2", "3"],
      ["3", "5"],
      ["5", "4"],
      ["4", "6"],
    ],
    "1"
  )
);

console.log(
  checkForTopologicalSort(
    [
      ["1", "2"],
      ["2", "3"],
      ["3", "4"],
      ["4", "2"],
    ],
    "1"
  )
);
