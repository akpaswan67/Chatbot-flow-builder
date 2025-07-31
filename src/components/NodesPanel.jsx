import React from 'react';

const NodesPanel = ({ onAdd }) => (
  <div className="nodes-panel">
    <h4>Message</h4>
    <button onClick={onAdd}>➕ Add Message Node</button>
  </div>
);

export default NodesPanel;
