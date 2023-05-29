import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import { Formik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { selfProfileChange, selfUser } from '../services/UserService';
import { UserContext } from '../context/Context';
import { encryptStorage1 } from '../utility/Storage';
import dayjs from 'dayjs';


const UpdateProfile = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const userMe = async () => {
        let res = await selfUser()
        console.log(res?.data);
        setCurrentUser(res?.data);
    }
    useEffect(() => {
        userMe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { id, name, middlename, surname, email, phone, address_line1, address_line2, city, zipcode, state, country, birth_date, gender, hobby } = currentUser

    console.log(id, name, middlename, surname, email, phone, address_line1, address_line2, city, zipcode, state, country, birth_date, gender, hobby);
    let selectedHobbies=hobby?.split(',')
    const navigate = useNavigate()
    const [userData] = useState({
        "name": (name === undefined ? "" : name),
        "email": (email === undefined ? "" : email),
        "middlename": (middlename === undefined ? "" : middlename),
        "surname": (surname === undefined ? "" : surname),
        "address_line1": (address_line1 === undefined ? "" : address_line1),
        "address_line2": (address_line2 === undefined ? "" : address_line2),
        "country": (country === undefined ? "" : country),
        "state": (state === undefined ? "" : state),
        "city": (city === undefined ? "" : city),
        "zipcode": (zipcode === undefined ? "" : zipcode),
        "mobile": (phone === undefined ? "" : phone),
        "gender": gender,
        "hobby": selectedHobbies
    })

    const phoneRegExp = (/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/);

    const LoginSchema = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 characters or less.')
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name.')
            .required('This is required field*'),
        email: Yup.string()
            .matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Please enter valid email.')
            .required('This is required field*'),
        middlename: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .matches(/^[A-Za-z ]*$/, 'Please enter valid middle name.')
            .required('This is required field*'),

        surname: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .matches(/^[A-Za-z ]*$/, 'Please enter valid surname.')
            .required('This is required field*'),
        address_line1: Yup.string()
            .required('This is required field*'),
        address_line2: Yup.string()
            .required('This is required field*'),
        country: Yup.string()
            .required('This is required field*'),
        state: Yup.string()
            .required('This is required field*'),
        city: Yup.string()
            .required('This is required field*'),
        zipcode: Yup.string()
            .required('This is required field*'),
        mobile: Yup.string()
            .required('This is required field*')
            .matches(phoneRegExp, "Please enter a valid phone number")
            .min(10, 'Too short, Please enter valid 10 digit mobile number.')
            .max(10, 'Too long, Please enter 10 digit mobile number.'),
        gender: Yup.string()
            .required('This is required field*'),
        hobby: Yup.array()
            .min(1, 'This is required field*'),
    })


    const [birthDate, setBirthDate] = useState('')
    const handleChange = (Date) => {
        var x = dayjs(Date).format("DD-MM-YYYY");
        console.log(Date);
        console.log(x);
        setBirthDate(Date)
    }

    const handleBlur=()=>{
        
    }

    const handleSubmitForm = (values) => {

        if(!birthDate){
            alert('Please enter date of birth.')
            return
        }

        let date = birthDate?.$D
        let month = (birthDate?.$M + 1)
        let year = birthDate?.$y
        let DOB=`${date}/${month}/${year}`
        const { name, email, middlename, surname, address_line1, address_line2, country, state, city, zipcode, mobile, gender, hobby } = values;
        console.log(hobby);
        let finalHobby = hobby.join(',')

        let personaData = {
            "name": name,
            "email": email,
            "middlename": middlename,
            "surname": surname,
            "address_line1": address_line1,
            "address_line2": address_line2,
            "country": country,
            "state": state,
            "city": city,
            "zipcode": zipcode,
            "phone": mobile,
            "birth_date":DOB,
            "gender": gender,
            "hobby": finalHobby
        }

        selfProfileChange(personaData)
            .then((res) => {
                console.log(res);
                encryptStorage1.setItem('userData', res?.data)
                setCurrentUser(res?.data)
                window.alert('Your profile is updated successfully.')
                navigate('/')

            })
            .catch((error) => {
                console.log(error);
            })

    }


    return (
        <>
            <Navbar />

            <div className='container my-5'>
                <div className='d-flex justify-content-center'>
                    <div className='rounded-2 border border-secondary-subtle p-3'>
                        <h3 className='my-2 text-center text-primary'>Update Your Profile</h3>
                        <Formik
                            initialValues={userData}
                            enableReinitialize={true}
                            validationSchema={LoginSchema}
                            onSubmit={(values) => { handleSubmitForm(values) }}
                        >

                            {(props) => (
                                <>
                                    {/* {console.log(props.values.hobby.includes('Cricket'))} */}

                                    <form onSubmit={props.handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputName"
                                                aria-describedby="NameHelp"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.name}
                                                name="name"
                                            />

                                            <span className='error_message'> {props.touched.name && props.errors.name ? (
                                                <div>{props.errors.name}</div>
                                            ) : null}</span>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.email}
                                                name="email"
                                            />
                                            <span className='error_message'> {props.touched.email && props.errors.email ? (
                                                <div>{props.errors.email}</div>
                                            ) : null}</span>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="exampleInputMiddleName" className="form-label">Middle Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputMiddleName"
                                                aria-describedby="MiddleNameHelp"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.middlename}
                                                name="middlename"
                                            />
                                            <span className='error_message'> {props.touched.middlename && props.errors.middlename ? (
                                                <div>{props.errors.middlename}</div>
                                            ) : null}</span>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="exampleInputSurname" className="form-label">Surname</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputSurname"
                                                aria-describedby="SurnameHelp"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.surname}
                                                name="surname"
                                            />
                                            <span className='error_message'> {props.touched.surname && props.errors.surname ? (
                                                <div>{props.errors.surname}</div>
                                            ) : null}</span>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="inputAddress" className="form-label">Address Line 1</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputAddress"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.address_line1}
                                                name="address_line1"
                                            />
                                            <span className='error_message'> {props.touched.address_line1 && props.errors.address_line1 ? (
                                                <div>{props.errors.address_line1}</div>
                                            ) : null}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputAddress2" className="form-label">Address Line 2</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputAddress2"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.address_line2}
                                                name="address_line2"
                                            />
                                            <span className='error_message'> {props.touched.address_line2 && props.errors.address_line2 ? (
                                                <div>{props.errors.address_line2}</div>
                                            ) : null}</span>
                                        </div>

                                        <div className="my-3">
                                            <label htmlFor="inputCountry" className="form-label">Country</label>

                                            <select id="inputCountry"
                                                className="form-select"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.country}
                                                name="country"
                                            >
                                                <option defaultValue="-1">Choose a country</option>
                                                <option value='India'>India</option>
                                                <option value='USA'>USA</option>
                                                <option value='Canada'>Canada</option>
                                            </select>

                                            <span className='error_message'> {props.touched.country && props.errors.country ? (
                                                <div>{props.errors.country}</div>
                                            ) : null}</span>
                                        </div>

                                        <div className="my-3">
                                            <label htmlFor="inputState" className="form-label">State</label>
                                            <select
                                                id="inputState"
                                                className="form-select"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.state}
                                                name="state"
                                            >
                                                <option defaultValue="-1">Choose a city</option>
                                                <option value='Gujarat'>Gujarat</option>
                                                <option value='Maharshtra'>Maharshtra</option>
                                                <option value='Rajasthan'>Rajasthan</option>
                                            </select>
                                            <span className='error_message'> {props.touched.state && props.errors.state ? (
                                                <div>{props.errors.state}</div>
                                            ) : null}</span>
                                        </div>

                                        <div>
                                            <label htmlFor="inputCity" className="form-label">City</label>

                                            <select id="inputCity"
                                                className="form-select"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.city}
                                                name="city"
                                            >
                                                <option defaultValue="-1">Choose a city</option>
                                                <option value='Surat'>Surat</option>
                                                <option value='Ahmedabad'>Ahmedabad</option>
                                                <option value='Vadodara'>Vadodara</option>
                                            </select>

                                            <span className='error_message'> {props.touched.city && props.errors.city ? (
                                                <div>{props.errors.city}</div>
                                            ) : null}</span>
                                        </div>



                                        <div className="my-3">
                                            <label htmlFor="inputZip" className="form-label">Zip</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputZip"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.zipcode}
                                                name="zipcode"
                                            />
                                            <span className='error_message'> {props.touched.zipcode && props.errors.zipcode ? (
                                                <div>{props.errors.zipcode}</div>
                                            ) : null}</span>
                                        </div>

                                        <div className="md-4">
                                            <label htmlFor="exampleInputMobNumber" className="form-label">Mobile Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputMobNumber"
                                                aria-describedby="MobNumberHelp"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.mobile}
                                                name="mobile"
                                            />
                                            <span className='error_message'> {props.touched.mobile && props.errors.mobile ? (
                                                <div>{props.errors.mobile}</div>
                                            ) : null}</span>
                                        </div>

                                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="Select Date of birth"
                                                    value={birthDate}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="birthDate"
                                                    className='my-3'
                                                />
                                                
                                            </DemoContainer>
                                        </LocalizationProvider>

                                        <div>Gender </div>
                                        <div className="my-2 form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="inlineRadio1">Male</label>

                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                id="inlineRadio1"
                                                value='Male'
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                name="gender"
                                                checked={props.values.gender==="Male"}
                                            />


                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                id="inlineRadio2"
                                                value='Female'
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                name="gender"
                                                checked={props.values.gender==='Female'}
                                            />


                                        </div>
                                        <span className='error_message'> {props.touched.gender && props.errors.gender ? (
                                            <div>{props.errors.gender}</div>
                                        ) : null}</span>

                                        <div className='my-2'> Hobbies </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Cricket</label>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                                value="Cricket"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                name="hobby"
                                                checked={props.values.hobby.includes('Cricket')}

                                            />

                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="inlineCheckbox2">Badminton</label>

                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                value="Badminton"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                name="hobby"
                                                checked={props.values.hobby.includes('Badminton')}
                                            />
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="inlineCheckbox3">Singing</label>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox3"
                                                value="Singing"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                name="hobby"
                                                checked={props.values.hobby.includes('Singing')}
                                            />

                                        </div>
                                        <span className='error_message'> {props.touched.hobby && props.errors.hobby ? (
                                            <div>{props.errors.hobby}</div>
                                        ) : null}</span>
                                        <br />
                                        <button onClick={() => navigate('/')} className="my-3 mx-2 btn btn-danger">Cancel</button>
                                        <button type="submit" className="my-3 btn btn-primary">Submit</button>

                                    </form>

                                </>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile