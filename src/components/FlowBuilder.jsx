import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  Controls,
} from 'react-flow-renderer';
import { v4 as uuidv4 } from 'uuid';
import CustomTextNode from './CustomTextNode';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import validateFlow from '../utils/validateFlow';
import '../style.css';

// Node type registry for extensibility and custom node definitions
const NODE_TYPES = [
  {
    type: 'textNode',
    label: 'Message',
    component: CustomTextNode,
    create: (position, nodes) => ({
      id: uuidv4(),
      type: 'textNode',
      position,
      data: { label: 'Send Message', text: '' },
    }),
  },
  // Add more node types here in the future
];

// Map node types to their React components for React Flow
const nodeTypes = NODE_TYPES.reduce((acc, n) => {
  acc[n.type] = n.component;
  return acc;
}, {});

// Main FlowBuilder component for building and editing chatbot flows
const FlowBuilder = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Handle node changes (drag, select, etc.)
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle edge changes (connect, disconnect, etc.)
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Add a new edge if the source node doesn't already have an outgoing edge
  const onConnect = useCallback(
    (params) => {
      const hasOutgoing = edges.some((e) => e.source === params.source);
      if (!hasOutgoing) setEdges((eds) => addEdge(params, eds));
    },
    [edges]
  );

  // Select a node to edit its settings
  const onNodeClick = (event, node) => setSelectedNode(node);

  // Add a new node of the specified type
  const addNode = (type) => {
    const nodeType = NODE_TYPES.find(n => n.type === type);
    if (!nodeType) return;
    const position = { x: 250, y: 100 + nodes.length * 100 };
    setNodes(nds => [...nds, nodeType.create(position, nds)]);
  };

  // Update the text of the selected node
  const onTextChange = (text) => {
    setNodes((nds) => {
      const newNodes = nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, text } }
          : node
      );
      // Update selectedNode to the latest node object
      const updatedNode = newNodes.find((node) => node.id === selectedNode.id);
      setSelectedNode(updatedNode);
      return newNodes;
    });
  };

  // Validate and save the flow, or alert if invalid
  const handleSave = () => {
    if (!validateFlow(nodes, edges)) {
      alert('Cannot save Flow: More than one unconnected nodes.');
    } else {
      console.log('Flow Saved:', { nodes, edges });
    }
  };

  return (
    <div className="flow-builder">
      <div className="canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      <div className="sidebar">
        <button onClick={handleSave} className="save-btn">Save Changes</button>
        {selectedNode ? (
          <SettingsPanel
            node={selectedNode}
            onTextChange={onTextChange}
            onBack={() => setSelectedNode(null)}
          />
        ) : (
          <NodesPanel nodeTypes={NODE_TYPES} onAdd={addNode} />
        )}
      </div>
    </div>
  );
};

export default FlowBuilder;
