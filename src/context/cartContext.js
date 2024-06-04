import axios from "axios";
import { data } from "jquery";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export function CartContextProvider({children}){

const [cartProducts , setCartProducts] = useState(null);
const [totalCartPrice , setTotalCartPrice] = useState(0);
const [numOfCartItems , setNumOfCartItems] = useState(0);
const [cartId , setCartId] = useState(null); //this is for payment confirmation

  async function addProductToCart(productId){
//   cann't use reactQuery in context , I can't use state management inside state management
   try{
    const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {
        "productId" : productId
     },{
      
 headers :{token : localStorage.getItem('tkn')}
     })

     getUserCart();
        // to store data after receiving it from API
        // setCartProducts(data.data.cartProducts) 
        // setNumOfCartItems(data.numOfCartItems)
        // setTotalCartPrice(data.data.totalCartPrice)

     return data ; 
   }

   catch (error){
    console.log('error -> ', error);
   }

   }


  async function getUserCart(){
    try{
      const{data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
      headers:{
        token : localStorage.getItem('tkn')
      }
    });

    setNumOfCartItems(data.numOfCartItems)
    setTotalCartPrice(data.data.totalCartPrice)
    setCartProducts(data.data.products)
    setCartId(data.data._id)
    }
    catch(error){
       console.log("error -> " , error)
    }

   
   }


  //Remove item from cart 
   async function deleteProduct(productId){
    try {
      const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
        headers :{
          token : localStorage.getItem ('tkn')

        }
      })
      
      //set the new data 
      setNumOfCartItems(data.numOfCartItems)
      setTotalCartPrice(data.data.totalCartPrice)
      setCartProducts(data.data.products)
       
      // return response to receive it in res in deleteElement function in cart.jsx
      return data;
    
    } catch (error) {
      console.log("deleteProduct error ->" , error);
    }
   }


   async function updateUserCart(productId , count){
    try {
      const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {"count" : count } ,
       {
        headers : {
          token : localStorage.getItem ('tkn')

        }
      })

      setNumOfCartItems(data.numOfCartItems)
      setTotalCartPrice(data.data.totalCartPrice)
      setCartProducts(data.data.products)
       
      return data ; 

    } catch (error) {
      console.log("updateUserCart error ->" , error);
    }
   }
  

  async function clearUserCart(){
    try {
     const {data} =  await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
      headers : {
        token : localStorage.getItem('tkn')
      }
     })

     setNumOfCartItems(0)
      setTotalCartPrice(0)
      setCartProducts([])

    } catch (error) {
      console.log("error -> " , error);
    }
  }


   //call getUserCart to show it after user logged in immediately 
   useEffect(function(){
    getUserCart();

   },[])


   //************************Wishlist******************************* */

  const [wishlist, setWishlist] = useState(null)

   //Add to wishlist
async function addProductToWishlist(productId){
  try {
   const {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist' ,{
      'productId' : productId
    },
    {
      headers :{token : localStorage.getItem('tkn')}
    })

    setWishlist(data?.data);

    return data ; 

  } catch (error) {
    console.log('error' , error);
  }
}


//get user Wishlist
async function getUserWishlist(){
  try {
  const{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    headers : {token : localStorage.getItem('tkn')}
  });

  setWishlist(data?.data)

  } catch (error) {
    console.log('error' , error);
  }
}

//remove from wishlist
async function removeProductFromWishlist(productId){
  try {
    const {data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}`,{
      headers : {token : localStorage.getItem('tkn')}
    })

    setWishlist(data?.data);

return data ;

  } catch (error) {
    console.log('wishlist error' , error);
  }
}

useEffect(function(){
  getUserWishlist();
},[getUserWishlist])










//   Provider is a component here 
  return<cartContext.Provider 
  value=
  {{addProductToCart ,
  getUserCart,
  deleteProduct,
  updateUserCart,
  clearUserCart, 
  cartProducts ,
  totalCartPrice ,
   numOfCartItems ,
   cartId,
   //those for payment to set cart data
   setCartProducts,
   setTotalCartPrice,
   setNumOfCartItems,
   //those for wishlist
    getUserWishlist,
    removeProductFromWishlist,
    addProductToWishlist,
    wishlist , 
   }}>
  
  {children}

  </cartContext.Provider>

}