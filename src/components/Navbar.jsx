import React from 'react'
import { Link, NavLink } from 'react-router'

const Navbar = () => {
  return (
    <nav className='bg-white flex justify-between items-center p-4 shadow-lg'>
      <h1 className=' text-2xl text-pink-600 font-bold font-'>LOGO</h1>
      <div>
        <ul className='flex items-center gap-4 text-lg font-medium text-gray-700' >
          <li>
            <NavLink to='/'>
              {({ isActive }) => (
                <span className={isActive ? " bg-pink-500 p-2 text-white rounded-sm" : ""}>Home</span>
              )}
            </NavLink>
          </li>
          
          <li>
            <NavLink to='/blog'>
              {({ isActive }) => (
                <span className={isActive ? " bg-pink-500 p-2 text-white rounded-sm" : ""}>Blog</span>
              )}
            </NavLink>
            </li>
            
            <li>
            <NavLink to='/addblog'>
              {({ isActive }) => (
                <span className={isActive ? " bg-pink-500 p-2 text-white rounded-sm" : ""}>Add Blog</span>
              )}
            </NavLink></li>
        
        </ul>
      </div>
    </nav>
  )
}

export default Navbar