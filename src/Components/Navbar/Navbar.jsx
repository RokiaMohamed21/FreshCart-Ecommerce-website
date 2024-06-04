import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import imgLogo from '../../Images/freshcart-logo.svg'
import { authContext } from '../../context/authentication'
import { cartContext } from '../../context/cartContext';

export default function Navbar() {

const {token , setToken}=  useContext(authContext) ; 
const navFunc = useNavigate (); 
const {numOfCartItems} =useContext(cartContext);

function logout(){

  localStorage.removeItem ('tkn') ; 

  setToken (null);

  setTimeout ( function(){
    navFunc('/login')
  } , [2000])

}


  return (
    <>
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5"   >
  <div className="container-fluid container " >
    <Link className="navbar-brand" to="/">

    <img  className='container' src={imgLogo} alt="" />


    </Link>


    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">



      <ul className="navbar-nav me-auto mb-2 mb-lg-0">      

      {token ? <>
      
        <li className="nav-item">
        <Link  className = 'nav-link' to = '/products'>Products</Link>
        </li>

        <li className="nav-item">
        <Link  className = 'nav-link' to = '/categories'>Categories</Link>
        </li>

        <li className="nav-item">
        <Link  className = 'nav-link' to = '/brands'>Brands</Link>
        </li>

        <li className="nav-item">
        <Link  className = 'nav-link' to = '/allOrders'>AllOrders</Link>
        </li>


        <li className="nav-item">
        <Link  className = 'nav-link' to = '/wishlist'>Wishlist</Link>
        </li>

        <li className="nav-item">
        <Link  className = 'nav-link position-relative ' to = '/cart'>
          <span style={{color : 'green' , fontWeight : 'bold' , fontFamily : 'cursive'}}><i className="fa-solid fa-cart-shopping " style={{fontSize : '20px'}}></i></span>

          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {numOfCartItems}
            <span className="visually-hidden">unread messages</span>
          </span>

        </Link>
        </li>

      </> : " "}

      
      </ul>


      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">

      <li className="nav-item fs-5">
      <i className="fa-brands  me-2 fa-facebook"></i>     
      <i className="fa-brands  me-2 fa-twitter"></i>
      <i className="fa-brands  me-2 fa-linkedin"></i>
      <i className="fa-brands  me-2 fa-whatsapp"></i>
        </li>

          {token ? <>
          
       
        <li className="nav-item">
        <span onClick={logout} style={{cursor : 'pointer'}}  className = 'nav-link'>Logout</span>
        </li>    

          </> 
          
          : 
          
          <>
           <li className="nav-item">
         <Link  className = 'nav-link' to = '/login'>Login</Link>
        </li>

        <li className="nav-item">
        <Link  className = 'nav-link' to = '/register'>Register</Link>
        </li>

          </>
          
          }
       


       
      </ul>



    </div>
  </div>
</nav>
    
    </>
  )
}
