import React from 'react'
import footerlogo from '../../Images/freshcart-logo.svg'

export default function Footer() {
  return (
    <>
   
   <div className=' text-center' style={{marginTop : '100px' , backgroundColor :'#F6F5F2' , minHeight: 'calc(30vh - 50px)'}}>
    <img className='pt-4' src={footerlogo} alt = 'site-logo'/>
    <h6 className='pt-2'>Our Partners .. </h6>
    
    <ul className='list-unstyled m-0 d-flex justify-content-center align-items-center pb-2'>
      <li className='mx-1'><i className="fa-brands fa-amazon" style ={{color:'#FFD43B'}}></i></li>
      <li className='mx-1'><i className="fa-brands fa-paypal" style ={{color:'#63E6BE'}}></i></li>
      <li className='mx-1'><i className="fa-brands fa-apple" style ={{color:'#c11a1a'}}></i></li>
      <li className='mx-1'><i className="fa-brands fa-cc-mastercard" style ={{color:' #4320ac'}}></i></li>
      <li className='mx-1'><i className="fa-brands fa-cc-visa" style ={{color:' #1f48ea'}}></i></li>
    </ul>

    <h6 style={{color : 'green'}} >Rokia Mohamed , 2024</h6>

   </div>
    
    </>
  )
}
