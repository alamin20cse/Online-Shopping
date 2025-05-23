import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './Layout/SignUp.jsx';
import AuthProvider from './Shared/AuthProvider.jsx';
import HomeMain from './Layout/HomeMain.jsx';
import Login from './Layout/Login.jsx';
import Home from './Layout/Home.jsx';



import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import ShowProduct from './Layout/ShowProduct.jsx';
import AddProduct from './Layout/AddProduct.jsx';
import Payment from './Layout/Payment.jsx';
import PaymentSuccessed from './Layout/PaymentSuccessed.jsx';
import PaymentFail from './Layout/PaymentFail.jsx';
import Dashboard from './Shared/Dashboard.jsx';
import DashboardMain from './Shared/DashboardMain.jsx';
import Profile from './Layout/Profile.jsx';
import AllPaymentInfo from './Layout/AllPaymentInfo.jsx';
import AllUsers from './Layout/AllUsers.jsx';
import AdminRoute from './Route/AdminRoute.jsx';
import PrivateRoute from './Route/PrivateRoute.jsx';
import Errorpage from './Layout/Errorpage.jsx';











const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeMain></HomeMain>,
    children:[
      {
        path:'/',
        element:<Home></Home>

      },
      {
        path:'/signup',
        element:<SignUp></SignUp>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/allproduct',
        element:<PrivateRoute><ShowProduct></ShowProduct></PrivateRoute>
      },
     
      {
        path:'/payment/:id',
        element:<PrivateRoute><Payment></Payment></PrivateRoute>
      },
      {
        path:'/payment/success/:tranid',
        element:<PrivateRoute><PaymentSuccessed></PaymentSuccessed></PrivateRoute>
      },
      {
        path:'/payment/fail/:tranid',
      
        element:<PrivateRoute><PaymentFail></PaymentFail></PrivateRoute>
      },
     

    ]
  },
  {
    path:'*',
    element:<Errorpage></Errorpage>

  },

{
  path:"/dashboard",
  element:<Dashboard></Dashboard>,
  children:[
    {
      path:"/dashboard",
      element:<PrivateRoute><DashboardMain></DashboardMain></PrivateRoute>
    },
    {
      path:"/dashboard/profile",
      element:<PrivateRoute><Profile></Profile></PrivateRoute>
    },
    {
      path:"/dashboard/allpayments",
      element:<AdminRoute><AllPaymentInfo></AllPaymentInfo></AdminRoute>
    },

  {
    path:"/dashboard/allusers",
    element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
  },

  {
    path:"/dashboard/addproduct",
    element: <AdminRoute><AddProduct></AddProduct></AdminRoute>
  }

  ]
}
]);
// resolve after confilic
// re solve
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  </QueryClientProvider>
  </AuthProvider>
  </StrictMode>,
)


 