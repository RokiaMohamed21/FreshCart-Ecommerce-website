import React, { children } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout' ;
import Products from './Components/Products/Products';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
 import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Payment from './Components/Payment/Payment';
import { CartContextProvider } from './context/cartContext';
import { AuthProvider } from './context/authentication';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Cart from './Components/Cart/Cart';
import AllOrders from './Components/AllOrders/AllOrders';
import { Offline, Online } from "react-detect-offline";
import Wishlist from './Components/Wishlist/Wishlist';



const routers = createHashRouter([
{path: "/" , element : <Layout/> , children : [
   
  //Products bdl page el home , zyha
  {index : true , element : <ProtectedRoute><Products/></ProtectedRoute>},
  {path : "products" , element : <ProtectedRoute><Products/></ProtectedRoute>},
  {path : "payment" , element : <ProtectedRoute><Payment/></ProtectedRoute>},
  {path : "allorders" , element : <ProtectedRoute><AllOrders/></ProtectedRoute>},

  // react router Dom allow to write parameter name in path 
  {path : "productDetails/:id" , element : <ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path: "brands" , element :<ProtectedRoute> <Brands/></ProtectedRoute>},
  {path: "cart" , element :<ProtectedRoute> <Cart/></ProtectedRoute>},
  {path: "wishlist" , element :<ProtectedRoute> <Wishlist/></ProtectedRoute>},

  {path: "categories" , element : <ProtectedRoute><Categories/></ProtectedRoute> },


  {path: "register" , element : <Register/>},
  {path : "login" , element : <Login/>} , 
  {path : "navbar" , element : <Navbar/>} , 
  {path : "footer" , element : <Footer/>} , 
  {path : "*" , element : <NotFound/>} , 




]
},


])





export default function App() {

let clientQuery = new QueryClient();

  return (
    <>
    <QueryClientProvider client = {clientQuery}>
      
    <CartContextProvider>

    <AuthProvider>
    <RouterProvider  router={routers}/>
    </AuthProvider>

    </CartContextProvider>

    <Toaster/>

    </QueryClientProvider>



    <Offline>
      <div className='position-fixed bottom-0 start-0 bg-danger text-white p-3 rounded-3'>Ooops ! .. You are Offline  </div>
    </Offline>

    </>
  )
}

