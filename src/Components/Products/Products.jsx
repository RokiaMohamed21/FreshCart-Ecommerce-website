import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Products() {

  const {addProductToCart ,addProductToWishlist}  = useContext(cartContext);

 async function addProduct(id){
 const res =  await addProductToCart(id);


if(res.status === 'success'){
  toast.success("Product added successfully to your cart" , {
    position : 'top-center' ,
    duration : 2000,
  })
}
else{
  toast.error ("Error happend" , {
    duration : 2000 ,
  })
}


 }


//add Product to wishlist to call it in button of wishlist 
async function addToWishlist(id){
  const res = await addProductToWishlist (id)

  if(res && res.status === 'success'){
    toast.success("Product added successfully to your wishlist" , {
      position : 'top-center' ,
      duration : 2000,
    })
  }
  else{
    toast.error('error occured')
  }
}








function getAllProducts(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/products")
}

const { isError , isFetching, isLoading , data , refetch}= useQuery("allProducts" , getAllProducts ,{
  enabled : false 
})



  // loading screen 
   if(isLoading){
    return <div className="vh-100 d-flex justify-content-center align-items-center" >

    <Circles
      height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    />
    </div>
   }



  return (
  
    <>

     <Helmet>
        <title>All Products</title>
        <meta name = 'description' content='This is all Products for FreshCart E-commerce website'/>
      </Helmet>

      
      <div className="container">

      {/* HomeSlider section */}
        <div className="row gx-0 mb-4">
          <div className="col-md-9">
              <HomeSlider/>
          </div>
          {/* static pics of HomeSlider */}
          <div className="col-md-3">
                <img style = {{width : '100%' , height : '200px'}} src={require('../../Images/grocery-banner.png')} alt='grocery1'/>
                <img style = {{width : '100%' , height : '200px'}} src={require('../../Images/grocery-banner-2.jpeg')} alt='grocery2'/>
          </div>
        </div>

         <CategorySlider/>
      

         {/* show products button */}
        {/* <button onClick={refetch} className = 'btn btn-success w-100 mt-5 ' > Show Products</button> */}
        {data ? <div className ='w-100 d-flex justify-content-center align-items-center' style={{height : '10px' , backgroundColor : 'green' , opacity :'0.6' , borderRadius : '5px'}}></div> : (
    <button onClick={refetch} className='btn btn-success w-100 mt-5'>
        Show Products
    </button>
)}


 



       <div className="row gy-4">

     {/* mapping on products data */}
     {data?.data.data.map( function(product , idx){return  ( 
      
      <>
  
      <div key= {idx} className="col-md-3 py-3 mt-5">

        <div className="product">
        <Link to={`/productDetails/${product.id}`}> 

          <img src={product.imageCover} className='w-100' alt={product.title}/>
          <h6 className='main-color pt-2 text-center' style={{fontFamily : 'inherit'}}>{product.category.name}</h6>
          <h5 className='text-center'>{product.title.slice(0 , 15)}...</h5>
          {/*  <h5 className='text-center'>{product.title.split(" ").slice(0 , 2).join(" ")}</h5> */}
            <div className='container d-flex justify-content-between align-items-center'>
            <p style={{fontWeight : 'bold' , color:'#A94438'}}>{product.price} EGP</p>
            <p style={{fontWeight : 'bold' , color : '#FFC94A'}}><span><i className="fa-solid fa-star spann"></i></span>{product.ratingsQuantity}</p>
           {/* To show product id :  <p>{product.id}</p> */}
            </div> 
        
           </Link>
           
        <div className='container d-flex justify-content-between align-items-center'>
          <button onClick={()=> addProduct(product.id)} className='w-100 p-1 rounded-3 main-bg-color border-white  text-white'> + Add To Cart</button>
            <button onClick={()=> addToWishlist(product.id)} style={{ border: 'none', background: 'none' }}><i className="fa-solid fa-heart" style={{color: '#cd0a0a' , fontSize: '24px'}}></i></button>
        </div>



        </div>


        </div> 

        
        </>    )  }    ) }

       </div>
    </div>  




    </>
  )
}
