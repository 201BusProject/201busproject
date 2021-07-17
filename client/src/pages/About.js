import React from "react";
import Content from "./Content";

function About(props) {
  const { onClick } = props;

  return (
    <div className="about">
      <Content onClick = {onClick}/>
    </div>
  );
}

export default About;
