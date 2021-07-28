import React from "react";

const Tooltip = ({ feature }) => {
  const { id } = feature.properties;

  return (
    <div id={`tooltip-${id}`}>
      {feature.layer.id}
    </div>
  );
};

export default Tooltip;
