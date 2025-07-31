import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

// Custom node component for displaying a message in the flow
const CustomTextNode = ({ data, isConnectable }) => (
  <div className="custom-node">
    <div className="node-header">Send Message</div>
    <div className="node-body">{data.text || 'Text here...'}</div>

    {/* Connection handle for incoming edges */}
    <Handle
      type="target"
      position={Position.Top}
      isConnectable={isConnectable}
    />
    {/* Connection handle for outgoing edges */}
    <Handle
      type="source"
      position={Position.Bottom}
      isConnectable={isConnectable}
    />
  </div>
);

export default CustomTextNode;
