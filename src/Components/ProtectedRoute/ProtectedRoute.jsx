import React, { useContext } from 'react'
import { authContext } from '../../context/authentication'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    const {token} = useContext(authContext) ;
//this is the original >>
//    if(token === null) {
//     return <Navigate to="/products" />
// }



// if(token == null){
//   return <>
  
//   <div className = 'container'style={{display: 'flex' , justifyContent : 'center' , alignItems : 'center' , width :'100vw' , height : '100vh' , backgroundColor : '#e0f9e0' , border : '3px solid #0AAD0A' , borderRadius: '10px'}}>
//   <h1 style= {{color : '#0AAD0A' , fontSize : '3rem' , fontWeight : 'bold' , lineHeight : '2' , textShadow: '1px 1px 2px'}}>Loading ... </h1>
//  </div>
  
//   </>
// }


  return <>
   {children}
  
  </>
   
  
}
