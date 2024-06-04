import React from 'react'
import error from '../../Images/error.svg'

export default function NotFound() {
  return( 
    <>
      <div  className="d-flex flex-column justify-content-center align-items-center vh-100" >
      <h1 className='text-center fw-bold text-danger'>Page Not found</h1>
       <img className= "w-50" src={error} alt='Not Found'/>
      </div>
     
   </>
  )
}
