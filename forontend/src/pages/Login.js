import React, { useContext, useState } from 'react'
import loginicons from'../assest/signin.gif'
import  {FaRegEye} from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import  {toast}  from 'react-toastify';
import SummaryApi from '../common';
import Context from './../context/index';




const Login = () => {
    const[showpass,setshowpass]=useState(false)
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)
  

    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }

    console.log("login data",data)

  return (
<section id='login' >
    <div className='mx-auto container p-4'>
        <div className='bg-white p-2 w-full mx-auto  max-w-[220px] min-h-[200px]' >
            <div className='w-10 h-10 mx-auto'>
                <img src={loginicons} alt="login icons" />
            </div>
            <form className=' text-sm my-2' onSubmit={handleSubmit}>
                <div className=' grid my-2'>
                    <label className='text-xs'>Email:</label>
                  <div className=' bg-slate-200  '>
                  <input 
                  type="email"
                   placeholder='Enter Your email'
                   onChange={handleOnChange}
                   name='email'
                   value={data.email}
                   className='  w-full h-full outline-none pg-transparen  bg-slate-200  text-xs'/>
                  </div>
                </div>
                <div className='my-2'>
                    <label className='text-xs'>Password:</label>
                   <div className=' bg-slate-200 flex items-center py-1' >
                     <input 
                     type={showpass ? "text":"password "} 
                     placeholder='Enter Your password' 
                     onChange={handleOnChange}
                     name='password'
                     value={data.password}
                     className=' w-full h-full outline-none pg-transparent  bg-slate-200 text-xs' />
                     <div className=' cursor-pointer text-lg' onClick={()=>setshowpass((prev)=>!prev)}>
                        <span className='text-xs'>
                            {
                                showpass ? (
                                    <FaEyeSlash/>  

                                ):
                                (
                                    < FaRegEye/> 
                             

                                )
                            }
                           
                        </span>
                     </div>
                   </div>
                   <Link to={"/forgetpassword"} className='block w-fit ml-auto hover: underline hover:text-red-500  text-xs'>Forget password</Link>

                </div>
                <button className=' bg-red-600 text-white px-4 py-1 w-full max-w-[130px] rounded-full hover:scale-110 transition-all mx-auto block my-6'>Login</button>
            </form>
            <p className=' my-1 text text-xs'>Don't have Account ?<Link to={"/signup"} className=' text-red-400 hover:text-red-700'>singn up</Link></p>
        </div>

    </div>
     
</section>
  )
}

export default Login
