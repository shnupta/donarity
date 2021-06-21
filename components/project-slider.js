import React from "react";
import Slider from "react-slick";
import ProjectTile from "./project-tile";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import styles from './project-slider.module.css'

export default function ProjectSlider({ projects }) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: false,
  };

  return (
      <div className={styles.slider}>
        <Slider {...settings}>
          {projects.map(project => (
            <div key={project.id}>
              <ProjectTile project={project} />
            </div>
          ))}
        </Slider>
      </div>
    );
}