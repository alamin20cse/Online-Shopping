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
        element:<ShowProduct></ShowProduct>
      },
      {
        path:'/addproduct',
        element:<AddProduct></AddProduct>
      },
      {
        path:'/payment/:id',
        element:<Payment></Payment>
      },
      {
        path:'/payment/success/:tranid',
        element:<PaymentSuccessed></PaymentSuccessed>
      },
      {
        path:'/payment/fail/:tranid',
      
        element:<PaymentFail></PaymentFail>
      },
     

    ]
  },
 
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


 