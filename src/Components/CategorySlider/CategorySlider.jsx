import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { MutatingDots } from 'react-loader-spinner';

export default function CategorySlider() {

//function categories API
  function getAllCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }


  const{data , isLoading} = useQuery('categorySlider' , getAllCategories , {
    refetchOnMount : false ,
  })


 if(isLoading){
   return<div className='container d-flex justify-content-center align-items-center mb-2'>
   
   <MutatingDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  secondaryColor="#4fa94d"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>
  
 }


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows : false,
      };

  return <>
  

 <div className='my-5'>

  <h4 style ={{color : 'green' , textDecoration: 'underline' , fontFamily:'monospace' , Width : '50%' , fontWeight : 'bold'  }}>Category Slider</h4>
  <Slider {...settings}>
 {data?.data.data.map(function (category , idx) { return  <div key = {idx}>
        <img style={{width : '100%' , height : '200px', marginBottom : '10px'}} src={category.image} alt='slider'/>
        <h6 className ='mt-3' style={{textAlign : 'center'}}>{category.name}</h6>
      </div>

 } )}
    
    </Slider>


    </div>

  </>
}
