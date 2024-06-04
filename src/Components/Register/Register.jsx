import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';



export default function Register() {

  let user = { 
    name : " " , 
    email : " " , 
    phone : " " , 
    password : " ",
    rePassword : " " , 
  }

  

   const [errMsg , setErrMsg] = useState(null);
   const [successMsg , setsuccessMsg ] = useState(null);
   const navigate = useNavigate()
   const [isLoading , setIsLoading] = useState (false)

  async function registerNewUser (values) {
 
//Register button (loading spinner)

setIsLoading (true) ; 

     //calling api


  console.log("sending to backend");

  setErrMsg(null) ; 


    
     try{
      const {data} = await axios.post ('https://ecommerce.routemisr.com/api/v1/auth/signup' , values)
      console.log(data);

     if(data.message === "success"){
     
       setsuccessMsg("Account has created successfully") ; 

         //navigate function
        setTimeout (function () {
          navigate ('/login')
        } , [2000])


     }

     }
    catch(error){
      
console.log("error" , error.response.data.message);

setErrMsg (error.response.data.message);

    }


    setIsLoading (false) ;


  
  }






  
  //map form and formik object
  const formikObj = useFormik({ 
     initialValues : user ,



    onSubmit : registerNewUser ,
 

   validate : function(values){
    
    const errors = {} ; 


    if(values.name.length < 3 || values.name.length > 20){
      errors.name = "Name must be more than 3 charcters & less than 20 charcters" ; 
    }

    if(values.email.includes ("@") === false || values.email.includes(".") === false){
      errors.email = "email isn't valid , should include @ and .com " ;
    }


    if( !values.phone.match (/^(02)?01[0125][0-9]{8}$/) ){
      errors.phone = "phone should be 11 numbers";
    }


    if(values.password.length < 6 || values.password.length > 12 ){
      errors.password = "password should be more than 6 or less than 12" ;
    }

    if(values.password !== values.rePassword) {
      errors.rePassword = "please write the same password" ;
    }


    return errors ; 
    
    }
  
  }) ;
  








  return (
  
  <>
    
    <Helmet>
        <title>Register</title>
        <meta name = 'description' content='Enter your data in register page for the first time '/>
      </Helmet>


    <div className="w-75 m-auto py-5 container">
  
 
   {errMsg ?  <div className=' alert alert-danger'> {errMsg} </div> : " " }
   {successMsg ? <div className='alert alert-success'> {successMsg} </div> : " "}


  <h2>Register Now : </h2>

  <form  onSubmit={formikObj.handleSubmit}  className=' form-control mt-3'>

    <label htmlFor='name' className='fw-bolder'>Name : </label>
    <input  onBlur = {formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name}  id='name' placeholder="write you name" type='text' className=' form-control mt-3  mb-3 w-100 rounded'/>
    {formikObj.errors.name && formikObj.touched.name ? <div className='alert alert-danger'>{formikObj.errors.name }</div> : " " }


    <label htmlFor='email' className='fw-bolder'>Email: </label>
    <input   onBlur = {formikObj.handleBlur}  onChange={formikObj.handleChange} value={formikObj.values.email}   id='email' placeholder='Write your email ' type='text' className=' form-control mt-3 mb-3 w-100 rounded'/>
    {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'>{formikObj.errors.email }</div> : " " }


    <label htmlFor='phone' className='fw-bolder'>Phone : </label>
    <input   onBlur = {formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone}  id='phone' placeholder='Write your phone' type='tel' className=' form-control mt-3 mb-3 w-100 rounded'/>
    {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert alert-danger'>{formikObj.errors.phone }</div> : " " }


    <label htmlFor='password' className='fw-bolder'>Password : </label>
    <input  onBlur = {formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type='password' placeholder='Write your password'  className=' form-control mt-3 mb-3 w-100 rounded'/>
    {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger'>{formikObj.errors.password }</div> : " " }


    <label htmlFor='rePassword' className='fw-bolder'>re-Password : </label>
    <input  onBlur = {formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.rePassword}  id='rePassword' type='Password' placeholder='re-Password' className=' form-control mt-3 mb-3 w-100 rounded'/>
    {formikObj.errors.rePassword && formikObj.touched.rePassword ? <div className='alert alert-danger'>{formikObj.errors.rePassword }</div> : " " }


     <button  disabled = {formikObj.isValid === false || formikObj.dirty === false} type='submit' className='btn btn-success'>
      
            {isLoading ? <ColorRing
                visible={true}
                height="40"
                width="50"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64','#f47e60','#f8b26a', '#abbd81', '#849b87']}
                /> : "Register"}
      
      
      
      </button>

     

  </form>


    </div>

    
    
    </>
  )
}
