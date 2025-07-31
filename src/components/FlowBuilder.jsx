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

// Node registry for extensibility
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

const nodeTypes = NODE_TYPES.reduce((acc, n) => {
  acc[n.type] = n.component;
  return acc;
}, {});

const FlowBuilder = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => {
      const hasOutgoing = edges.some((e) => e.source === params.source);
      if (!hasOutgoing) setEdges((eds) => addEdge(params, eds));
    },
    [edges]
  );

  const onNodeClick = (event, node) => setSelectedNode(node);

  // Generic addNode function
  const addNode = (type) => {
    const nodeType = NODE_TYPES.find(n => n.type === type);
    if (!nodeType) return;
    const position = { x: 250, y: 100 + nodes.length * 100 };
    setNodes(nds => [...nds, nodeType.create(position, nds)]);
  };

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
