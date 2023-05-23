import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import RegistrationForm from './RegistrationForm'
import Login from './Login'
import Dashboard from './Dashboard'

const MainRoute = () => {
    return (
        <>
            <BrowserRouter>
            
                <Routes>
                    <Route path='/' element={<RegistrationForm />} />
                    <Route path='/registration' element={<RegistrationForm />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MainRoute