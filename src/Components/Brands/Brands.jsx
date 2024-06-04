import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Hourglass } from 'react-loader-spinner'
import { useQuery } from 'react-query'


export default function Brands() {

const {isLoading , data}= useQuery('brands' , getAllBrands)

 function getAllBrands(){
return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
}

    
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


  return (

    <>
     <Helmet>
        <title>Brands</title>
      </Helmet>


      <div className="container">
      <div className="row gy-3">
     {data?.data.data.map((brand , idx)=>{return<>
      <div key={idx} className="col-md-3">

         <img className='w-100' src = {brand.image} alt = {brand.slug} />

         <div style={{backgroundColor : 'beige' , borderRadius : '10px' }}>
         <h3 className="text-center text-main my-4" style={{color : 'green' , fontWeight : 'bolder' , fontFamily : 'initial'}}>{brand.name}</h3>
         </div>

      </div>
      </>
        
     })}
          </div>
      </div>

    </>
  )
}
