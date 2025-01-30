import React, { useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate()


  useEffect(()=>{
      if(user?.role !== ROLE.ADMIN){
          navigate("/")
      }
  },[user])
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full  w-full  max-w-44 customShadow'>
        <div className='h-32  flex justify-center items-center flex-col'>


          <div className=' text-4xl cursor-pointer relative flex justify-center' >
            {
              user?.profilePic ? (
                <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
              ) : (
                <FaUserCircle />
              )
            }

          </div>
          <p className='capitalize text-xs font-semibold'>{user?.name}</p>
          <p className='text-xs'>{user?.role}</p>
          {/***navigation */}
          <div>
            <nav className='grid px-2'>
              <Link to={"all-users"} className=' pt-2 hover:bg-slate-100 text-xs'>All Users</Link>
              <Link to={"all-products"} className='pt-1 hover:bg-slate-100 text-xs'>All product</Link>
            </nav>
          </div>
        </div>
      </aside>
      <main className='w-full h-full p-2'>
        <Outlet />
      </main>

    </div>
  )
}

export default AdminPanel
