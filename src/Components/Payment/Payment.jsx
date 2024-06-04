import axios from 'axios'
import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik'
import * as yup from "yup";


export default function Payment() {


const {cartId ,setCartProducts, setTotalCartPrice,setNumOfCartItems} = useContext(cartContext)

const shippingAddress = {
 
      details: '',
      phone: '',
      city: ''
}




async function confirmCashPayment(values){
//we can use usrformik to make validation but this another way 




try {
   const{data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId} `, values , {
       headers:{
           token : localStorage.getItem('tkn')
         }
    
   })
   console.log(data);
   if (data.status === 'success'){
       toast.success('order successfully initialized')
       // set Cart data to original values after confirm payment -> those from cartContext(getUserCart)
       setCartProducts ([]) 
       setTotalCartPrice (0)
       setNumOfCartItems (0)


   }else{
       toast.error('Error on creating Order')
   }

   
   
} catch (error) {
   console.log("error occured : " , error);
}

}


//confirm payment with credit card
async function confirmOnlinePayment(values){
  



//   if (!phoneValue || !cityValue || !detailsValue) {
//    console.error("Error: Phone, city, and details are required fields.");
//    alert("Phone, city, and details are required fields. Please fill them out.");
//    return
// }


     try {
       
  const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`  ,values , 
   {
   headers: {token : localStorage.getItem('tkn')} , 
   params : {url : "http://localhost:3001"}
   } ,
   
  )

  
  window.open(data.session.url , '_blank')

     } catch (error) {
       console.log("error payment -> ", error)  ;
     }

}

function handleCashPayment() {
  confirmCashPayment(shippingAddress);
}

function handleOnlinePayment() {
  confirmOnlinePayment(shippingAddress);
}

const _validationSchema = yup.object({
  phone : yup.string().matches(/^01[0125][0-9]{8}$/ , "phone is invalid").required("enter your phone"),
  city : yup.string().max(13 , "city should less than 13 letters").required('Please enter your city'),
  details : yup.string().max(30 , "max letters is 30 ").required('enter the details') 
})


const formikObj = useFormik({
 initialValues : shippingAddress ,
 onSubmit : () => {}, 
 validationSchema : _validationSchema 
})


 return (
   <>
   
   <Helmet>
       <title>Payment</title>
       <meta name = 'description' content='Confirm Payment'/>
     </Helmet>

   <div className="container py-5 ">
<form  onSubmit={formikObj.handleSubmit}  className='form-control'> 

 <label htmlFor='phone' className='mb-2' style={{color : 'green' , fontWeight : 'bold' , fontSize : '18px' , fontFamily : 'cursive'}}>Phone : </label>
 <input onBlur = {formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} id ='phone' type="tel" placeholder='Write Your Phone' className=' mb-3 form-control' />
 {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert alert-danger'>{formikObj.errors.phone }</div> : " " }


 <label htmlFor='city' className='mb-2' style={{color : 'green' , fontWeight : 'bold' , fontSize : '18px' , fontFamily : 'cursive'}}>City : </label>
 <input onBlur = {formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.city} id = 'city' type="text" placeholder='Your City' className='mb-3 form-control' />
 {formikObj.errors.city && formikObj.touched.city ? <div className='alert alert-danger'>{formikObj.errors.city }</div> : " " }


 <label htmlFor='details' className='mb-2' style={{color : 'green' , fontWeight : 'bold' , fontSize : '18px' , fontFamily : 'cursive'}}>Details : </label>
 <textarea onBlur = {formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.details} id='details'  type="text" placeholder='Details' className='mb-3 form-control' />
 {formikObj.errors.details && formikObj.touched.details ? <div className='alert alert-danger'>{formikObj.errors.details }</div> : " " }


 <button   disabled = {formikObj.isValid === false || formikObj.dirty === false} type = 'button' onClick = {handleCashPayment} className='btn btn-success' style={{margin : '15px' , padding : '10px'}}> Confirm Cash Payment </button>
 <button  disabled = {formikObj.isValid === false || formikObj.dirty === false} type = 'button' onClick = {handleOnlinePayment} className='btn btn-success' style={{margin : '15px' , padding : '10px'}}> Confirm Online Payment </button>

</form>

   </div>
   
   </>
 )
}
