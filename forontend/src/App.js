import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Heder from './component/Heder';
import Footer from './component/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })
    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    } 
    

  }
  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })
    const dataApi = await dataResponse.json()
    console.log("dataApi",dataApi)

    setCartProductCount(dataApi?.data?.count)
  }
  useEffect(()=>{
    fetchUserDetails()
    fetchUserAddToCart()

  },[])
  return (
  <>
    <Context.Provider value={{
          fetchUserDetails,
          cartProductCount, 
          fetchUserAddToCart
       }}>
   <ToastContainer 
          position='top-center'
        />
 <Heder/>
 <main className='min-h-[calc(100vh-120px)] pt-16'>
  <Outlet/>
  </main>
  <Footer/>
  </Context.Provider>
  </>
  );
}

export default App;
