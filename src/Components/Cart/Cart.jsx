import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import { Circles } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {

 const{cartProducts , totalCartPrice , numOfCartItems , deleteProduct , updateUserCart , clearUserCart} = useContext(cartContext) ; 


async function deleteElement(id){

   const res =  await deleteProduct(id);
   if(res.status === 'success'){
    toast.success('Product removed' , {
        position : 'top-center' ,
        duration : 2000,
      })
   }
   else{
    toast.error('Error unhandled' ,{
        position : 'top-center' ,
        duration : 2000,
    })
   }


}

async function removeUserCart(){
  await clearUserCart();
}

async function updateCartElement(id , count){
  const res = await updateUserCart(id , count);

  console.log("status" , res.status);

  if(res.status === 'success'){
    toast.success('Updated successfully')
  }
  else{
    toast.error('Error occured')
  }
} 

if(cartProducts === null){
 return<>
 <div className = 'container'style={{display: 'flex' , justifyContent : 'center' , alignItems : 'center' , width :'100vw' , height : '100vh' , backgroundColor : '#e0f9e0' , border : '3px solid #0AAD0A' , borderRadius: '10px'}}>
  <h1 style= {{color : '#0AAD0A' , fontSize : '3rem' , fontWeight : 'bold' , lineHeight : '2' , textShadow: '1px 1px 2px'}}>Cart is Empty  <Link to='/products'></Link> </h1>
 </div>
 </>


    // return <div className="vh-100 d-flex justify-content-center align-items-center" >
    // <Circles
    //   height="80"
    // width="80"
    // color="#4fa94d"
    // ariaLabel="circles-loading"
    // wrapperStyle={{}}
    // wrapperClass=""
    // visible={true}
    // />
    // </div>
}

//when remove all products in cart (clear cart) check length to stop making loading and go to products 
else if (cartProducts.length === 0 ){
return<>
 
 <div className = 'container'style={{display: 'flex' , justifyContent : 'center' , alignItems : 'center' , width :'100vw' , height : '100vh' , backgroundColor : '#e0f9e0' , border : '3px solid #0AAD0A' , borderRadius: '10px'}}>
  <h1 style= {{color : '#0AAD0A' , fontSize : '3rem' , fontWeight : 'bold' , lineHeight : '2' , textShadow: '1px 1px 2px'}}>Cart is Empty  <Link to='/products'></Link> </h1>
 </div>

</>
}

  return <>

     <Helmet>
        <title>Your Cart</title>
      </Helmet>



    <div className='container py-5' style={{backgroundColor: `#DEF5E5` , paddingLeft : '20px'}}>
       <h2 style={{paddingBottom : '5px' ,fontWeight : 'bold'}}>Shop Cart : </h2>
       <h5 style={{color : 'green'}}>Total Cart Price : {totalCartPrice} EGP</h5>
       <h6 style={{color: 'green' , paddingBottom : '10px '}} >Total Items : {numOfCartItems}</h6>
      
{/* clear & confirm payment buttons */}
<div className='d-flex justify-content-between align-items-center'>
<button onClick={ removeUserCart} className='btn btn-outline-danger'>Clear Cart</button>
 <Link to='/payment'  className='btn btn-outline-success' style={{marginRight : '25px'}}> Confirm Payment </Link>
</div>

{/* mapping on cart products */}
    {cartProducts.map(function(product , idx){
      
     console.log(product);

       return <div key={idx} className="row my-2 border-bottom border-3 p-3 align-items-center">
       <div className="col-sm-1"> 
       <img className ='w-100' src={product.product.imageCover} alt= {product.product.title}/>
       </div>

       <div className="col-sm-9">
          <h4>Title : {product.product.title}</h4>
          <h6>Price : {product.price} </h6>
          <button onClick={()=> deleteElement(product.product.id)} className='btn btn-outline-danger'><i className="fa-solid fa-trash" style={{fontSize : '19px', paddingRight : '7px' ,display:'inline'}}></i>
             Remove
          </button>
       </div>

       <div className="col-sm-2"> 
         <div className="d-flex align-items-center">
          <button onClick={()=> updateCartElement(product.product.id , product.count + 1)} className='btn btn-outline-success'>+</button>
          <span className='mx-2'>{product.count}</span>
          <button onClick={()=> updateCartElement(product.product.id , product.count - 1)} className='btn btn-outline-success' >-</button>
         </div>


       </div>
     </div>

    })}


    </div>
  </>
  
  
}
