import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Wishlist from './Pages/Wishlist'
import Cart from './Pages/Cart'
import CheckOut from './Pages/CheckOut'
import Error404 from './Pages/Error404'
import Account from './Pages/Account'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/wishlist",
        element: <Wishlist />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: <CheckOut />
      },
      {
        path: "/account",
        element: <Account />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "*",
        element: <Error404 />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App