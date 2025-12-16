const pushToNode = (nodes, u, v) => {
  nodes[u] = nodes[u] || { parents: [], childs: [], degrees: 0 };
  nodes[v] = nodes[v] || { parents: [], childs: [], degrees: 0 };
  nodes[v].parents.push(u);
  nodes[u].childs.push(v);
  nodes[v].degrees++;
};

export const createNodes = (graph) => {
  const nodes = {};
  for (const [u, v] of graph) {
    pushToNode(nodes, u, v);
  }
  return nodes;
};
const topologicalSort = (graph) => {
  const nodes = createNodes(graph);
  const path = [];
  const totalNodes = Object.keys(nodes);
  const queue = totalNodes.filter((key) => nodes[key].degrees === 0);
  while (queue.length > 0) {
    const node = queue.shift();
    path.push(node);
    for (const childNode of nodes[node]?.childs) {
      nodes[childNode].degrees--;
      if (nodes[childNode].degrees === 0) queue.push(childNode);
    }

    delete nodes[node];
  }

  if (totalNodes.length !== path.length) {
    console.log("cycle existing!!");
  }

  return path;
};

console.log(topologicalSort(
  [
    ["a", "c"],
    ["b", "c"],
    ["c", "d"],
  ],
));


console.log(topologicalSort([[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]]))