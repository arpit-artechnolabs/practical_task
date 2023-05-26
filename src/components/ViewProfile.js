import React from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'


const ViewProfile = () => {
    let navigate = useNavigate()
    const location = useLocation()
    console.log(location);
    const { name, middlename, surname, email, phone, address_line1, address_line2, city, zipcode, state, country, birth_date, gender, hobby } = location?.state?.userData

    return (
        <>
            <Navbar />

            <div className='my-3 py-1 mx-3'>
                <p className='mb-0'>  Name : {`${name} ${middlename} ${surname}`}  </p>
                <p className='mb-0'>Email : {email} </p>
                <p className='mb-0'>Mobile Number : {phone} </p>
                <p className='mb-0'>Address : {`${address_line1} ${address_line2} ${city} ${zipcode} ${state} ${country}`} </p>
                <p className='mb-0'>Birthdate : {birth_date} </p>
                <p className='mb-0'>Gender : {gender} </p>
                <p className='mb-0'>Hobbies : {hobby} </p>

                <button type="button" onClick={() => navigate('/')} className="my-2 btn btn-primary">Go to dashboard</button>
            </div>
        </>
    )
}

export default ViewProfile