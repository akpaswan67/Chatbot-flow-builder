import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const CustomTextNode = ({ data, isConnectable }) => (
  <div className="custom-node">
    <div className="node-header">Send Message</div>
    <div className="node-body">{data.text || 'Text here...'}</div>

    <Handle
      type="target"
      position={Position.Top}
      isConnectable={isConnectable}
    />
    <Handle
      type="source"
      position={Position.Bottom}
      isConnectable={isConnectable}
    />
  </div>
);

export default CustomTextNode;
