import React from 'react'
import { useAuth } from '../contexts/authContext'
import Navbar from '../components/Navbar'

const Profile = () => {

    const { currentUser } = useAuth()

    return (
        <>
        <Navbar />
        <div>
            <span className='font-bold text-2xl text-center mt-10 w-screen'>Welcome back, {currentUser?.displayName ? currentUser.displayName : currentUser?.email}</span>
        </div>
        </>
    )
}

export default Profile
