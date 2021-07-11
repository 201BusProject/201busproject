import React from "react";
import Content from "./Content";
import Footer from "./Footer";

function About(props) {
  const { onClick } = props;

  return (
    <div className="about">
      <Content onClick = {onClick}/>
      <Footer />
    </div>
  );
}

export default About;
