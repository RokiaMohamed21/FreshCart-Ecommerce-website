import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Helmet from 'react-helmet'

export default function AllOrders() {
    const [userOrders , setUserOrders] = useState(null)


useEffect(()=> {
    const res = jwtDecode(localStorage.getItem('tkn'))
    getUserOrders(res.id);


}, [])


async function getUserOrders(id){
   try {
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    console.log(data);

     // set the orders with the received data after calling API
    setUserOrders(data)
    
   } catch (error) {
    console.log("error" , error);
   }
}



 //handling when orders = null to be able to mapping on userOrders
 if(userOrders === null){
    //kont added position absolute
    return <div className='text-center bg-dark vw-100 bg-opacity-10  start-0  vh-100 d-flex
     flex-column justify-content-center align-items-center'>
    
    <div>
     <h2 style={{color : 'green' , marginBottom : '40px'}}>Searching for Orders </h2>

    <ThreeDots
      height="50"
      width="100%"
      radius="9"
      color="#0aad0a"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  </div>

  </div>


 }




  return (
    <>

  <Helmet>
        <title>All Orders</title>
        <meta name = 'description' content='These are your all Orders'/>
      </Helmet>


    <div className="container">
        <div className="row">
            {userOrders.map ((order , idx) => {

        console.log("Order:", order);
        console.log("Shipping Address:", order.shippingAddress);


               return <div key={idx} className="col-md-6 " >
                <div className="order rounded-2  p-3 m-3  " style={{backgroundColor : 'beige'}} >
    

                    <div className="container ">
                        <div className="row">
                           {/* mapping on cartItems array */}
                 {order.cartItems?.map ((item , index) => {
                    return <>
                       <div key={index}   className='col-sm-4 '>
                       <img className = 'w-100  mb-3'  src={item.product.imageCover} alt={item.product.title}/>
                          <h5 style={{color : '#627254' , fontWeight : 'bold'}}>Title : {item.product.title.slice(0 , 9)}...</h5>
                         <h6 style={{color : '#944E63' , fontWeight : 'bold'}}>Count : {item.count} </h6>
                         <h6 style={{color : '#944E63' , fontWeight : 'bold'}}>Price : {item.price}</h6>
                       </div>
                    
                    </>
                 })}
              
                        </div>

                    </div>


                    <p style={{fontWeight : 'bold' , color : '#481E14' ,fontSize : "17px"}}>order sent to user with phone :<strong>{order.shippingAddress && order.shippingAddress.phone ? order.shippingAddress.phone : 'N/A'}</strong><br />
                     and with Details : <strong>{order.shippingAddress && order.shippingAddress.details ? order.shippingAddress.details : 'N/A'}</strong><br />
                     at City : <strong>{order.shippingAddress && order.shippingAddress.city ? order.shippingAddress.city : 'N/A'}</strong><br />
                    </p>

                    <h5 style={{fontWeight : 'bolder' , color : '#803D3B'}}>Payment method : {order.paymentMethodType}</h5>
                    <h5 style={{fontWeight : 'bolder' , color : '#803D3B'}}>Total Cost: {order.totalOrderPrice} EGP</h5>

                </div>
            </div>
            })}
        </div>
    </div>

   


    </>
  )
}