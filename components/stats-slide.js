import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import StatsTile from "./stats-tile";
import { DonationFrequency } from '@prisma/client'
import Button from './button'

import styles from './stats-slide.module.css'

const singleTotals = function(donations, name) {
  const total = donations.reduce((a, d) => {
    return a + (((d.frequency === DonationFrequency.Single) && (d.charity.name === name)) ? parseInt(d.amount) : 0);
  }, 0);
  return total;
}

const mapSingleTotals = function(donations) {

  const list = mapSingleLabels(donations);
  
  const mapTotal = list.map((d) => {
    return singleTotals(donations, d);
  });
  return mapTotal;
}

const monthlyTotals = function(donations, name) {
  const total = donations.reduce((a, d) => {
    return a + (((d.frequency === DonationFrequency.Monthly) && (d.charity.name === name)) ? parseFloat(d.amount) : 0);
  }, 0);
  return total;
}

const mapMonthlyTotals = function(donations) {
  const list = mapMonthlyLabels(donations);
  
  const mapTotal = list.map((d) => {
    return monthlyTotals(donations, d);
  });
  return mapTotal;
}

const mapSingleLabels = function(donations) {
  var labels = [];

  for (let i = 0; i < donations.length; ++i) {
    if (donations[i].frequency === DonationFrequency.Single) {
      labels.push(donations[i].charity.name);
    }
  }

  let uniqueItems = [...new Set(labels)];
  return uniqueItems;
}

const mapMonthlyLabels = function(donations) {
  var labels = [];

  for (let i = 0; i < donations.length; ++i) {
    if (donations[i].frequency === DonationFrequency.Monthly) {
      labels.push(donations[i].charity.name);
    }
  }

  let uniqueItems = [...new Set(labels)];
  return uniqueItems;
}

// function ColourLeftArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//         <div
//             className={className}
//             style={{...style, display: 'block', background: "red"}}
//             onClick={onClick}
//         />
          
//   );
// }

// function ColourRightArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//         <div
//             className={className}
//             style={{...style, display: 'block', background: "red"}}
//             onClick={onClick}
//         />
//   );
// }

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
      slidesToScroll: 1,
      arrows: false,
    };


    return (
      <div className={styles.slide}>
        <Slider {...settings}>
          <div> {/* Total to each charity */}
            <StatsTile labels={mapSingleLabels(this.state.donations)} data={mapSingleTotals(this.state.donations)} bar={true} title={"Total of single donations"}/>
          </div>
          <div> {/* Percentage to each charity */}
            <StatsTile labels={mapMonthlyLabels(this.state.donations)} data={mapMonthlyTotals(this.state.donations)} bar={true} title={"Total of monthly donations"}/>
          </div>
          <div>
            <StatsTile labels={mapSingleLabels(this.state.donations)} data={mapSingleTotals(this.state.donations)} bar={false} title={"Total of single donations"}/>
          </div>
          <div>
            <StatsTile labels={mapMonthlyLabels(this.state.donations)} data={mapMonthlyTotals(this.state.donations)} bar={false} title={"Total of single donations"}/>
          </div>
        </Slider>
      </div>
    );
  }
}