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

const checkCycle = (nodes) => {
  for (const key of Object.keys(nodes)) {
    if (nodes[key].state === 0) {
      if (dfs(nodes, key)) return true;
    }
  }

  return false;
};

const DAGCheck = (graph) => {
  const nodes = {};
  for (const [u, value] of graph) {
    pushToNode(nodes, u, value);
  }

  const isCycleFound = checkCycle(nodes);

  return !isCycleFound;
};

console.log(
  DAGCheck([
    ["p", "q"],
    ["r", "s"],
    ["p", "r"],
    ["q", "s"],
  ])
);

console.log(
  DAGCheck([
    ["1", "2"],
    ["2", "3"],
    ["3", "4"],
    ["6", "7"],
    ["6", "9"],
    ["7", "8"],
    ["8", "6"],
  ])
);

console.log(
  DAGCheck([
    ["1", "2"],
    ["2", "3"],
    ["3", "5"],
    ["5", "4"],
    ["4", "6"],
  ])
);

console.log(
  DAGCheck([
    ["1", "2"],
    ["2", "3"],
    ["3", "4"],
    ["4", "2"],
  ])
);
