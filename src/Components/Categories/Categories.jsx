import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Categories() {

const{data , isLoading} = useQuery('categories' , getAllCategories)

function getAllCategories(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/categories' ,{
    params :{
      'limit' : 10 ,
      
    }
  });
}

if(isLoading){
  
  
}




  return (
    <>
     <Helmet>
        <title>Categories</title>
        <meta name = 'description' content='This is all Categories in FreshCart E-commerce website'/>
      </Helmet>

    {isLoading ? 
     <div className="container d-flex justify-content-center align-items-center " style={{ height: '100vh' }}>
         
         <Hourglass
         visible={true}
         // height="80"
         width="80"
         ariaLabel="hourglass-loading"
         wrapperStyle={{}}
         wrapperClass=""
         colors={['#4fa94d', '#4fa94d']}
         
         />
         </div> 

         :

<div className="container">

  
<div className='row gy-5 gx-5 mt-3'>
{data?.data.data.map((categ , idx)=>{ return <>
  <div key = {idx} className="col-md-4">
   
  
    <div className="category">
        <h3 className='text-center' style={{fontWeight : 'bold'}}>{categ.name}</h3>
        <img className='w-100 rounded-5 mt-2' style={{height : '350px' , weight:'350px'}} src={categ.image} alt={categ.slug}/>
    </div>  



  </div>
  </>
})}
</div>

</div>



    
  }
    </>
  )
}
