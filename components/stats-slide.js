import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import StatsTile from "./stats-tile";
import BarChart from "./bar-chart";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <StatsTile total={false}/>
          </div>
          <div>
            <StatsTile total={false}/>
          </div>
          <div>
            <StatsTile total={true}/>
          </div>
          <div>
            <StatsTile total={true}/>
          </div>
          <div>
            <StatsTile total={false}/>
          </div>
          <div>
            <StatsTile total={false}/>
          </div>
        </Slider>
      </div>
    );
  }
}