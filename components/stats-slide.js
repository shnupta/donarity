import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import StatsTile from "./stats-tile";
import BarChart from "./bar-chart";
import { DonationFrequency } from '@prisma/client'

const singleTotals = function(donations, name) {
  const total = donations.reduce((a, d) => {
    return a + (((d.frequency === DonationFrequency.Single) && (d.charity.name === name)) ? parseInt(d.amount) : 0);
  }, 0);
  return total;
}

const mapSingleTotals = function(donations) {
  const mapTotal = donations.map((d) => {
    return singleTotals(donations, d.charity.name);
  });
  return mapTotal;
}

const mapSingleLabels = function(donations) {
  const mapLabels = donations.map((d) => {
    return d.charity.name;
  });

  let uniqueItems = [...new Set(mapLabels)];
  return uniqueItems;
}

export default class SimpleSlider extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      donations: props.donations,
    }
  }

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
          <div> {/* Total to each charity */}
            <StatsTile labels={mapSingleLabels(this.state.donations)} data={mapSingleTotals(this.state.donations)} />
          </div>
          <div> {/* Percentage to each charity */}
            <StatsTile labels={['British Red Cross', 'Dog\'s Trust', 'Malala Fund',
           'Save The Children']} data={mapSingleTotals(this.state.donations)}/>
          </div>
          <div>
            <StatsTile labels={['British Red Cross', 'Dog\'s Trust', 'Malala Fund',
           'Save The Children']} data={mapSingleTotals(this.state.donations)}/>
          </div>
        </Slider>
      </div>
    );
  }
}