import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { Hourglass } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  const {addProductToCart} = useContext(cartContext);

// useParams hold every params that i send like id that i wrote in path 
   const {id} =  useParams();
const[sendingLoader , setSendingLoader]= useState(false);

async function addProduct(id){

  setSendingLoader(true)

  const res = await addProductToCart(id) ;
 
if(res.status === 'success'){
    toast.success("Product added successfully to your cart" , {
      position : 'top-center' ,
      duration : 2000,
    })
  }
  else{
    toast.error ("Error happend" , {
      position : 'top-center',
      duration : 2000 ,
    })
  }
  
   setSendingLoader(false);


}
 
   //API function for specific products
function getProducsDetails(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}


const {data , isLoading}= useQuery('ProductDetails' , getProducsDetails)

    
if(isLoading){
  
    return( <div className="container d-flex justify-content-center align-items-center " style={{ height: '100vh' }}>
           
    <Hourglass
    visible={true}
    // height="80"
    width="80"
    ariaLabel="hourglass-loading"
    wrapperStyle={{}}
    wrapperClass=""
    colors={['#4fa94d', '#4fa94d']}
    
    />
    </div>)
}


//virtual dom 
  return (
    <>

   <div className="container py-5">
    <div className="row align-items-center">
            <div className="col-md-3">
                <figure>
                    <img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />
                </figure>
            </div>
            <div className="col-md-9">
                  
            <Helmet>
             <title>{data.data.data.title.split(' ').slice(0 , 2).join(' ')}</title>
            </Helmet>

                <div className="details text-center">
                    <h2>{data.data.data.title}</h2>
                    <p className='text-muted'>{data.data.data.description}</p>
                    <h5>Price : {data.data.data.price} EGP</h5>
                    <button onClick={()=> addProduct(data.data.data.id)} className='w-100 p-3 rounded-3 main-bg-color border-white mt-5 text-white' style={{display:'flex' , justifyContent : 'center' , alignItems : 'center'}}>
                      
                 
                        {sendingLoader?  <TailSpin
                              visible={true}
                              height="40"
                              width="40"
                              color="gray"
                              ariaLabel="tail-spin-loading"
                              radius="1"
                              wrapperStyle={{}}
                              wrapperClass=""
                              /> : "+ ADD To Cart"}
                      

                       </button>
                </div>

            </div>
    </div>
   </div>
    </>
  
)}
