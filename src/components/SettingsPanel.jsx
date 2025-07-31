import React from 'react';

const SettingsPanel = ({ node, onTextChange, onBack }) => {
  // Future extensibility: switch by node.type
  switch (node.type) {
    case 'textNode':
    default:
      return (
        <div className="settings-panel">
          <button onClick={onBack}>← Back</button>
          <h4>Message</h4>
          <textarea
            value={node.data.text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Enter message text"
          />
        </div>
      );
  }
};

export default SettingsPanel;
