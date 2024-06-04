import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows : false ,
      };

  return (
    <>
    <Slider {...settings}>
      <div>
        <img style={{width : '100%' , height : '400px'}} src={require('../../Images/slider-image-1.jpeg')} alt='slider'/>
      </div>
      <div>
        <img style={{width : '100%' , height : '400px'}} src={require('../../Images/slider-image-2.jpeg')} alt='slider'/>
      </div>
      <div>
        <img style={{width : '100%' , height : '400px'}} src={require('../../Images/slider-image-3.jpeg')} alt='slider'/>
      </div>
      <div>
        <img style={{width : '100%' , height : '400px'}} src={require('../../Images/slider-2.jpeg')} alt='slider'/>
      </div>
    </Slider>
    
    </>
  )
}
