import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Wishlist() {

const {wishlist , addProductToWishlist , removeProductFromWishlist ,getUserWishlist , addProductToCart} = useContext(cartContext)

// for addProduct button
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

async function removeFromWishlist(id){
   const res = await removeProductFromWishlist(id);

   if (res && res.status === 'success'){
    toast.success('Product removed successfully from your wishlist')
   }
   else{
    toast.error('error occured')
   }
}


if(wishlist === null){
  return<>
  <div className = 'container'style={{display: 'flex' , justifyContent : 'center' , alignItems : 'center' , width :'100vw' , height : '100vh' , backgroundColor : '#e0f9e0' , border : '3px solid #0AAD0A' , borderRadius: '10px'}}>
   <h1 style= {{color : '#0AAD0A' , fontSize : '3rem' , fontWeight : 'bold' , lineHeight : '2' , textShadow: '1px 1px 2px'}}>Wishlist is Empty  <Link to='/products'>Go to Products</Link> </h1>
  </div>
  </>

}
else if (!wishlist || wishlist.length === 0 ){
  return<>
   
   <div className = 'container'style={{display: 'flex' , justifyContent : 'center' , alignItems : 'center' , width :'100vw' , height : '100vh' , backgroundColor : '#e0f9e0' , border : '3px solid #0AAD0A' , borderRadius: '10px'}}>
    <h1 style= {{color : '#0AAD0A' , fontSize : '3rem' , fontWeight : 'bold' , lineHeight : '2' , textShadow: '1px 1px 2px'}}>wishlist is Empty  <Link to='/products'>Go To Products</Link> </h1>
   </div>
  
  </>
  }
  

  return (
    <> 
    
       <Helmet><title>Your Wishlist</title></Helmet>

    <div className='container py-5' style={{ backgroundColor: `#DEF5E5`, paddingLeft: '20px' }}>
        <h2 style={{ paddingBottom: '5px', fontWeight: 'bold' }}>Your Wishlist: </h2>

        {wishlist.map((wishlistProduct, idx) => (
          <div key={idx} className="row my-2 border-bottom border-3 p-3 align-items-center">
            <div className="col-md-2">
              <img className='w-100' src={wishlistProduct.imageCover} alt={wishlistProduct.title} />
            </div>

            {/* entire data */}
            <div className="col-md-8">
              <h5>{wishlistProduct.title}</h5>
              <p style={{color : '#A94438' , fontSize : '18px'}}>Category: {wishlistProduct.category?.name}</p>
              {/* <p>Category: {wishlistProduct.category ? wishlistProduct.category.name : 'No category available'}</p> */}
              {/* <p>Price: {wishlistProduct.price} EGP</p> */}
              <p> {wishlistProduct.priceAfterDiscount ? (
                <>
              <span style={{ textDecoration: 'line-through', marginRight: '5px' , color : 'red' }}>Price : {wishlistProduct.price} EGP</span>
              {wishlistProduct.priceAfterDiscount} EGP
            </>
          ) : (
            `Price : ${wishlistProduct.price} EGP`
          )} </p>

            </div>

            {/* remove button */}
            <div className="col-md-2">
            <button onClick ={()=>addProduct(wishlistProduct.id)} className='py-2 rounded-3 main-bg-color border-white mt-5 text-white' > <i className="fa-solid fa-plus" style={{color: '#0ced5b'}}></i> Add To Cart</button>
            <button onClick={() => removeFromWishlist(wishlistProduct.id)} className="btn btn-danger"><i className="fa-solid fa-trash" style={{fontSize : '19px', paddingRight : '16px' ,display:'inline'}}></i>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )



}
