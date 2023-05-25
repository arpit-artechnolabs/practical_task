import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { selfUser } from '../services/UserService'
import UpdateProfile from './UpdateProfile'

const PersonalProfileChange = () => {
    
    const [personalData,setPersonalData]=useState('')
    const userMe=async ()=>{
       let res= await selfUser()
        console.log(res?.data);
        setPersonalData(res?.data);
    }
    useEffect(()=>{
        userMe()
    },[])

  return (
    <>
    
    <UpdateProfile personalData={personalData} />
    </>
  )
}

export default PersonalProfileChange