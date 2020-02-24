import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './ImageCarousel.css';

export const ImageCarousel = ({ data, page }) => (
  <div>
    <Slider autoplay={2500} className={`slider ${page}Slider`}>
      {data.map((slide, index) => (
        <div
          key={index}
          style={{
            background: `url('${slide}') no-repeat center center `,
            backgroundSize: 'contain',
          }}
        />
      ))}
    </Slider>
  </div>
);
