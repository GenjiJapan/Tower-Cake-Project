import React from "react";
import About from "./About";
import Banner from "./Banner";
import Galllery from "./Gallery";
import Marquee from "./Marquee";
import OurCake from "./OurCake";

function HomePage(props) {
  return (
    <div>
      <div className="parallax">
        <Banner />
        <Marquee />
        <About />
        <OurCake />
        <Galllery />
      </div>
    </div>
  );
}

export default HomePage;
