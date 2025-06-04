import React from 'react'
import { useNavigate, useRouteError } from 'react-router'
import { Link } from 'react-router'

const NotFound = () => {
const error = useRouteError()
console.log(error)
const navigate = useNavigate()

    return (
        <div className='flex flex-col justify-center items-center h-[100vh] bg-blue-100'>
            <h3>{error.statusText}</h3>
            <p>{error.error.message || 'Undefined error'}</p>
        
            {/* <h3>Error!</h3>
            <p className='text-red-500'>Something went wrong</p> */}

            <p onClick={() => navigate('/', {replace: true})}></p>
            <p>You can go back to the homepage by clicking <Link to='/' className='text-blue-800 underline'>Here</Link></p>
        </div>
    )
}

export default NotFound