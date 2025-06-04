import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Homepage from './pages/Homepage'
import Blog from './pages/Blog'
import Rootlayout from './pages/Rootlayout'
import NotFound from './pages/NotFound'



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Rootlayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Homepage />
        },

        {
          path: 'blog',
          element: <Blog />
        }
      ]

    }
  ])



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
