import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from"../pages/Login";
import Forgetpassword from "../pages/Forgetpassword";
import SignUp1 from "../pages/SignUp1"
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";



const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[{
            path:"",
            element:<Home/>
        },
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"forgetpassword",
            element:<Forgetpassword/>
        },
        {
           path:"Signup",
           element:<SignUp1/>
        },
        {
            path : "product-category",
            element : <CategoryProduct/>
        },
        {
            path : "product/:id",
            element : <ProductDetails/>
        },
        {
            path : 'cart',
            element : <Cart/>
        },
        {
            path : "admin-panel",
            element : <AdminPanel/>,
            children : [
                {
                    path : "all-users",
                    element : <AllUsers/>
                },
                {
                    path : "all-products",
                    element : <AllProducts/>
                }
            ]
        }
          
        
    ]
      

        

    }
])
export default router