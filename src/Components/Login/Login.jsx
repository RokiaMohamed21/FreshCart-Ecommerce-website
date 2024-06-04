import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { authContext } from '../../context/authentication';
import { Helmet } from 'react-helmet';



export default function Login() {


  
 const {setToken} = useContext (authContext) ; 

  let user = { 
   
    email : " " , 
    password : " ",
  
  }

  

   const [errMsg , setErrMsg] = useState(null);
   const [successMsg , setsuccessMsg ] = useState(null);
   const navigate = useNavigate()
   const [isLoading , setIsLoading] = useState (false)

  async function LoginToAccount (values) {
 
 

//Register button (loading spinner)

setIsLoading (true) ; 

     //calling api


  console.log("sending to backend");
 
  setErrMsg(null) ; 

    
     try{
      const {data} = await axios.post ('https://ecommerce.routemisr.com/api/v1/auth/signin' , values)
      console.log(data);

     if(data.message === "success"){
      
      localStorage.setItem('tkn' , data.token)
       setToken(data.token)

       setsuccessMsg("Welcome back") ; 

       

         //navigate function
        setTimeout (function () {
          navigate ('/products')
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



    onSubmit : LoginToAccount ,
 

   validate : function(values){
    
    const errors = {} ; 


    

    if(values.email.includes ("@") === false || values.email.includes(".") === false){
      errors.email = "email isn't valid , should include @ and .com" ;
    }


    if(values.password.length < 6 || values.password.length > 12 ){
      errors.password = "password should be more than 6 or less than 12" ;
    }



    return errors ; 
    
    }
  
  }) ;
  








  return (
  
  <>

     <Helmet>
        <title>Login</title>
      </Helmet>

    
    <div className="w-75 m-auto py-5 container">
  
 
   {errMsg ?  <div className=' alert alert-danger'> {errMsg} </div> : " " }
   {successMsg ? <div className='alert alert-success'> {successMsg} </div> : " "}



  <h2 className=' mb-4 text-success'> Login :- </h2>

  <form  onSubmit={formikObj.handleSubmit}  className=' form-control mt-3'>

   

    <label htmlFor='email' className='fw-bolder'>Email: </label>
    <input   onBlur = {formikObj.handleBlur}  onChange={formikObj.handleChange} value={formikObj.values.email}   id='email' placeholder='Write your email ' type='text' className=' form-control mt-3 mb-3 w-100 rounded'/>
    {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'>{formikObj.errors.email }</div> : " " }
 


    <label htmlFor='password' className='fw-bolder'>Password : </label>
    <input  onBlur = {formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type='password' placeholder='Write your password'  className=' form-control mt-3 mb-3 w-100 rounded'/>
    {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger'>{formikObj.errors.password }</div> : " " }



     <button  disabled = {formikObj.isValid === false || formikObj.dirty === false} type='submit' className='btn btn-success'>
      
            {isLoading ? <ColorRing
                visible={true}
                height="40"
                width="50"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64','#f47e60','#f8b26a', '#abbd81', '#849b87']}
                /> : "Login"}
      
      
      
      </button>

     

  </form>


    </div>

    
    
    </>
  )
}
