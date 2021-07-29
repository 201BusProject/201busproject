import React from "react";

const Tooltip = ({ node }) => {

  return (
    <div id={`tooltip-${node.id}`}>
      {node.id}
    </div>
  );
};

export default Tooltip;
