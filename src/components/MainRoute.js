import React from 'react'
import { BrowserRouter,Link,Route, Routes } from 'react-router-dom'
import RegistrationForm from './RegistrationForm'
import Login from './Login'

const MainRoute = () => {
    return (
        <>
            <BrowserRouter>
            
                <Routes>
                    <Route path='/' element={<RegistrationForm />} />
                    <Route path='/registration' element={<RegistrationForm />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MainRoute