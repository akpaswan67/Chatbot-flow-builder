import React from 'react';

// Panel for displaying available node types and adding them to the flow
const NodesPanel = ({ nodeTypes, onAdd }) => (
  <div className="nodes-panel">
    {nodeTypes.map((node) => (
      <div key={node.type}>
        <h4>{node.label}</h4>
        <button onClick={() => onAdd(node.type)}>
          ➕ Add {node.label} Node
        </button>
      </div>
    ))}
  </div>
);

export default NodesPanel;
