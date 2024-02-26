import React, { useEffect, useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom';

const SignOut = () => {

    const navigate = useNavigate();
    const [test, setTest] = useState(false)

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setTest(true)
    }

    useEffect(() => {
        navigate('/login');
    }, [test])


    return (
        <div className='min-h-screen flex justify-center content-start bg-gray-100'>
            <div className='bg-white rounded-lg shadow-lg p-8 h-1/2 my-9'>
                <h1 className='text-3xl font-bold text-gray-800 mb-4'>MERN Stack Authentication and Authorization</h1>
                <p className='text-gray-600 mb-6'>User Role-Based Access Control & Permissions in React JS | MERN Stack.</p>
                <div className='flex gap-4'>

                    <button onClick={handleSignOut} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold'>
                        Sign Out
                    </button>


                    <Link to={'/dashboard'} >
                        <button className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold'>
                            Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignOut