import React from "react";
import "./AnimatedMenuIcon.css";

function AnimatedMenuIcon(props) {
  // const handleClick = () => {
  //   const barContainerElement = document.getElementsByClassName(
  //     "bar__container"
  //   )[0];
  //   !props.menuOpen && barContainerElement.classList.toggle("change");
  //   // props.onClick();
  //   // barContainerElement.class
  // };

  const barContainerElement = document.getElementsByClassName(
    "bar__container"
  )[0];
  props.isMenuClicked
    ? barContainerElement?.classList.add("change")
    : barContainerElement?.classList.remove("change");

  return (
    // <div class="bar__container" onClick={handleClick}>
    <div className="bar__container">
      <div className="bar1" style={{ backgroundColor: props.color }}></div>
      <div className="bar2" style={{ backgroundColor: props.color }}></div>
      <div className="bar3" style={{ backgroundColor: props.color }}></div>
    </div>
  );
}

export default AnimatedMenuIcon;
