import React, { useRef, useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as Yup from "yup";
import { Formik } from 'formik';
import '../css/RegistrationForm.css'
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/UserService';


const RegistrationForm = () => {

    const [error, setError] = useState(null)
    const passwordRef = useRef()
    const navigate = useNavigate()
    const [userData] = useState({
        "name": "",
        "email": "",
        "password": "",
        "confirm_password": "",
        "middlename": "",
        "surname": "",
        "address_line1": "",
        "address_line2": "",
        "country": "",
        "state": "",
        "city": "",
        "zipcode": "",
        "mobile": "",
        "gender": "",
        "hobby": []
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
        password: Yup.string()
            .required('This is required field*')
            // eslint-disable-next-line no-useless-escape
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character."),
        confirm_password: Yup.string()
            .required('This is required field*')
            .oneOf([Yup.ref('password'), null], 'Password and confirm password must match.'),
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


    const [birthDate, setBirthDate] = useState(null)
    const handleChange = (Date) => {
        console.log(Date);
        setBirthDate(Date)
        console.log(Date.$D, Date.$M + 1, Date.$y);
    }

    // const handleValidate=()=>{
    //     console.log('kl');

    // }

    const handleSubmitForm = (values) => {

        if (!birthDate) {
            alert('Please select date of birth.')
            return
        }


        let date = birthDate?.$D
        let month = (birthDate?.$M + 1)
        let year = birthDate?.$y
        const { name, email, middlename, surname, address_line1, address_line2, country, state, city, zipcode, mobile, gender, hobby, password, confirm_password } = values;
        let finalHobby = hobby.join(',')

        let registerUserData = {
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
            "birth_date": `${date} ${month} ${year}`,
            "gender": gender,
            "hobby": finalHobby,
            "password": password,
            "password_confirmation": confirm_password
        }

        registerUser(registerUserData)
            .then((res) => {
                console.log(res);
                window.alert('Account created successfully')
                navigate('/')

            })
            .catch((error) => {
                setError(error?.response?.data?.errors?.email[0]);
            })

    }
    console.log(error);
    return (
        <>
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-md-4'> </div>
                    <div className='col-md-4 rounded-2 border border-secondary-subtle'>
                        <h3 className='my-3 text-center text-primary'>Registation Form</h3>
                        <Formik
                            initialValues={userData}
                            enableReinitialize={true}
                            validationSchema={LoginSchema}
                            onSubmit={(values) => { handleSubmitForm(values) }}
                        >

                            {(props) => (
                                <>

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
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.password}
                                                name="password"
                                                ref={passwordRef}
                                            />
                                            <span className='error_message'> {props.touched.password && props.errors.password ? (
                                                <div>{props.errors.password}</div>
                                            ) : null}</span>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="exampleInputCPassword1" className="form-label">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputCPassword1"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.confirm_password}
                                                name="confirm_password"
                                                ref={passwordRef}
                                            />
                                            <span className='error_message'> {props.touched.confirm_password && props.errors.confirm_password ? (
                                                <div>{props.errors.confirm_password}</div>
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

                                        {/* <div className="col-md-12 my-3"> */}
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

                                        <div className="mb-3">
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

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="Select Date of birth"
                                                    value={birthDate}
                                                    onChange={handleChange}
                                                    // onBlur={handleValidate}
                                                    name="birthDate"
                                                    className='col-md-12'
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>

                                        <div className='my-2'>Gender </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="inlineRadio1">Male</label>

                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                id="inlineRadio1"
                                                value='Male'
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                name="gender"

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
                                            />

                                        </div>
                                        <span className='error_message'> {props.touched.hobby && props.errors.hobby ? (
                                            <div>{props.errors.hobby}</div>
                                        ) : null}</span>

                                        <h6 className='my-2 registration_error_message'> {error && error} </h6>
                                        <div className='my-2 text-center'>
                                            <button type="submit" className=" btn btn-primary">Submit</button>
                                        </div>
                                    </form>

                                </>
                            )}
                        </Formik>
                        <div className='my-2 text-center'>Already have an account ? <Link to='/'> Login Here </Link></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default RegistrationForm;