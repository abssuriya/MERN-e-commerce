import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { IoIosSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';

import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';


const Heder = () => {
    
        const user = useSelector(state => state?.user?.user)
        const dispatch = useDispatch()
        const [menuDisplay,setMenuDisplay] = useState(false)
        const context = useContext(Context)

        

        const handleLogout = async() => {
            const fetchData = await fetch(SummaryApi.logout_user.url,{
              method : SummaryApi.logout_user.method,
              credentials : 'include'
            })
            const data = await fetchData.json()

            if(data.success){
              toast.success(data.message)
              dispatch(setUserDetails(null))
            //   navigate("/")
            }
        
            if(data.error){
              toast.error(data.message)
            }
        }
    return (
        <header className='h-12 shadow-md bg-white fixed w-full z-40'>
            <div className='full container mx-auto flex items-center px-4 justify-between'>
                <div className=''>
                    <Link to={"/"}>
                    <Logo/>
                    </Link>
                </div>
                <div className=' text-xs flex items-center w-full justify-between max max-w-sm border rounded-full  max-h-[20px] max-w-[250px] shadow-md pl-2' >

                    < input type="text" placeholder='search product here...' className='w-full outline-none ' />
                    <div className=' text-base min-w-[40px] h-8 bg-slate-500 flex items-center justify-center rounded-r-full text-white max-h-[20px]'>

                        <IoIosSearch />
                    </div>


                </div>
                <div className=' flex items-center gap-4'>
                    <div className='relative flex justify-center'>
                        
                    {
                    user?._id && (
                      <div className=' text-2xl' onClick={()=>setMenuDisplay(preve => !preve)}>
                    {
                          user?.profilePic ? (
                            <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                          ) : (
                            <FaUserCircle />
                          )
                        }
                    
                    </div>
                    )
                  }
                    
                    {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2  shadow-lg rounded text-xs' >
                        <nav>
                          {
                            user?.role === ROLE.ADMIN && (
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                            )
                          }
                         
                        </nav>
                      </div>
                    )
                  }


                        

                    </div>
                    
                        {
                     user?._id && (
                      <Link to={"/cart"} className=' text-2xl relative'>
                        <span>
                            <FaCartArrowDown />
                        </span>
                      <div className='bg-red-600 text-white w-4 h-4 rounded-full  flex items-center justify-center absolute -top-2 -right-3'>
                            <p className='text-sm'>{context?.cartProductCount}</p>
                        </div>
                        </Link>
                     )
                    }
                        
                      

                   
                    <div className='text-xs' >
                    {
                    user?._id  ? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
                    )
                    : (
                    <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700'>Login</Link>
                    )
                  }
                        
                        </div>
                </div>
            </div>

        </header>
    )
}

export default Heder
