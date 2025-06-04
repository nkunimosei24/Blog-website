import React from 'react'
import { Link, NavLink } from 'react-router'

const Navbar = () => {
  return (
    <nav className='bg-blue-300 flex justify-between items-center p-3'>
      <h1>LOGO</h1>
      <div>
        <ul className='flex items-center gap-4 text-lg' >
          <li>
            <NavLink to='/'>
              {({ isActive }) => (
                <span className={isActive ? "bg-green-500 p-2" : ""}>Home</span>
              )}
            </NavLink>
          </li>
          <li><a href="">About</a></li>
          <li><a href="">Gallery</a></li>
          <li>
            <NavLink to='/blog'>
              {({ isActive }) => (
                <span className={isActive ? "bg-green-500 p-2" : ""}>Blog</span>
              )}
            </NavLink></li>
          <li><a href="">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar