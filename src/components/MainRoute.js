import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegistrationForm from './RegistrationForm'
import Login from './Login'
import Dashboard from './Dashboard'
import { UserContext } from '../context/Context'
import ViewProfile from './ViewProfile'
import PasswordChange from './PasswordChange'
import UpdateUser from './UpdateUser'
import UpdateProfile from '../components/UpdateProfile'

const MainRoute = () => {
    const { currentToken } = useContext(UserContext)
    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route path='/' element={currentToken ? <Dashboard /> : <Login />} />
                    <Route path='/registration' element={<RegistrationForm />} />
                    <Route path='/viewprofile' element={currentToken ? <ViewProfile /> : <Login />} />
                    <Route path='/update-profile' element={currentToken ? <UpdateProfile /> : <Login />} />
                    <Route path='/updatepassword' element={currentToken ? <PasswordChange /> : <Login />} />
                    <Route path='/update-user' element={currentToken ? <UpdateUser /> : <Login />} />

                    {/* <Route path='/login' element={<Login />} /> */}
                    {/* <Route path='/dashboard' element={ currentToken ? <Dashboard/> :<Login /> } /> */}
                    {/* <Route path='/dashboard' element={ <Dashboard/> } /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MainRoute