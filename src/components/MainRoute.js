import React, { useContext } from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import RegistrationForm from './RegistrationForm'
import Login from './Login'
import Dashboard from './Dashboard'
import { UserContext } from '../context/Context'
import UpdateProfile from './UpdateProfile'
import ViewProfile from './ViewProfile'

const MainRoute = () => {
    const {currentToken}=useContext(UserContext)
    return (
        <>
            <BrowserRouter>
            
                <Routes>
                    <Route path='/' element={ currentToken ? <Dashboard/> :<Login /> } />
                    <Route path='/registration' element={<RegistrationForm />} />
                    <Route path='/update-profile' element={<UpdateProfile />} />
                    <Route path='/viewprofile' element={<ViewProfile />} />

                    {/* <Route path='/login' element={<Login />} /> */}
                    {/* <Route path='/dashboard' element={ currentToken ? <Dashboard/> :<Login /> } /> */}
                    {/* <Route path='/dashboard' element={ <Dashboard/> } /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MainRoute