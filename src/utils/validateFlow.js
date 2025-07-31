// Validates that there is at most one node with no outgoing edges (i.e., only one end node)
const validateFlow = (nodes, edges) => {
  const sources = new Set(edges.map((e) => e.source));
  const nodesWithNoOutgoing = nodes.filter((n) => !sources.has(n.id));
  return nodesWithNoOutgoing.length <= 1;
};

export default validateFlow;
