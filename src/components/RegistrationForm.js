import React, { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as Yup from "yup";
import { Formik } from 'formik';
import '../css/RegistrationForm.css'

const RegistrationForm = () => {


    const [userData, setUserData] = useState({
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
        "birthDate": "",
        "gender": "",
        "hobby": ""
    })

    const phoneRegExp = (/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/);


    const LoginSchema = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name.')
            .required('This is required field*'),
        email: Yup.string()
            // .email('Invalid email address')
            // .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please Enter Valid Email")
            .matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Please Enter Valid Email')
            .required('This is required field*'),
        password: Yup.string()
            .required('This is required field*')
            // eslint-disable-next-line no-useless-escape
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
        confirm_password: Yup.string()
            .required('This is required field*')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        middlename: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .matches(/^[A-Za-z ]*$/, 'Please enter valid middle name.')
            .required('This is required field*'),

        surname: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .matches(/^[A-Za-z ]*$/, 'Please enter valid surname.')
            .required('This is required field*'),

        mobile: Yup.string()
            .required('This is required field*')
            .matches(phoneRegExp, "Please enter a valid phone number")
            .min(10, 'Too short, Please enter valid 10 digit mobile number.')
            .max(10, 'Too Long, Please enter 10 digit mobile number.'),

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
        date: Yup.string()
            .required('This is required field*'),
        gender: Yup.string()
            .required('This is required field*'),
        sex: Yup.string()
            .required('This is required field*'),
        hobby: Yup.string()
            .required('This is required field*'),
    })


    // const [birthDate, setBirthDate] = useState(null)
    const handleChange = (Date) => {
        // setBirthDate(Date)
        console.log(Date);
        console.log(Date.$D, Date.$M + 1, Date.$y);
    }

    const handleSubmitForm = (values) => {
        console.log(values);
    }
    return (
        <>

            <Formik
                initialValues={userData}
                enableReinitialize={true}
                validationSchema={LoginSchema}
                onSubmit={(values) => { handleSubmitForm(values) }}
            >

                {(props) => (
                    <>
                        {console.log(props)}
                        <div className='container my-4'>
                            <h4 className='d-flex justify-content-center text-primary'>Registation Form</h4>
                            <form>

                                <div class="mb-3">
                                    <label for="exampleInputName" class="form-label">Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
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

                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input
                                        type="email"
                                        class="form-control"
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

                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input 
                                    type="password" 
                                    class="form-control" 
                                    id="exampleInputPassword1" 
                                    onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.password}
                                        name="password"
                                    />
                                    <span className='error_message'> {props.touched.password && props.errors.password ? (
                                        <div>{props.errors.password}</div>
                                    ) : null}</span>
                                </div>

                                <div class="mb-3">
                                    <label for="exampleInputCPassword1" class="form-label">Confirm Password</label>
                                    <input 
                                    type="password" 
                                    class="form-control"
                                    id="exampleInputCPassword1"
                                    onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.confirm_password}
                                        name="confirm_password"
                                    />
                                    <span className='error_message'> {props.touched.confirm_password && props.errors.confirm_password ? (
                                        <div>{props.errors.confirm_password}</div>
                                    ) : null}</span>
                                </div>


                                <div class="mb-3">
                                    <label for="exampleInputMiddleName" class="form-label">Middle Name</label>
                                    <input 
                                    type="text" 
                                    class="form-control" 
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

                                <div class="mb-3">
                                    <label for="exampleInputSurname" class="form-label">Surname</label>
                                    <input 
                                    type="text" 
                                    class="form-control" 
                                    id="exampleInputSurname" 
                                    aria-describedby="SurnameHelp" 
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                        value={props.values.surname}
                                        name="surname"
                                    />
                                    <span className='error_message'> {props.touched.surname && props.errors.confirm_password ? (
                                        <div>{props.errors.surname}</div>
                                    ) : null}</span>
                                </div>

                                <div class="mb-3">
                                    <label for="inputAddress" class="form-label">Address Line 1</label>
                                    <input 
                                    type="text" 
                                    class="form-control" 
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
                                <div class="mb-3">
                                    <label for="inputAddress2" class="form-label">Address Line 2</label>
                                    <input
                                     type="text" 
                                     class="form-control" 
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
                                
                                <div class="col-md-6 my-3">
                                    <label for="inputCountry" class="form-label">Country</label>
        
                                    <select id="inputCountry" 
                                    class="form-select"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                        value={props.values.country}
                                        name="country"
                                    >
                                        <option selected="-1">Choose a city</option>
                                        <option value='Surat'>Surat</option>
                                        <option value='Ahmedabad'>Ahmedabad</option>
                                        <option value='Vadodara'>Vadodara</option>
                                    </select>

                                    <span className='error_message'> {props.touched.country && props.errors.country ? (
                                        <div>{props.errors.country}</div>
                                    ) : null}</span>
                                </div>


                                <div class="col-md-6">
                                    <label for="inputCity" class="form-label">City</label>
        
                                    <select id="inputCity" 
                                    class="form-select"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                        value={props.values.city}
                                        name="city"
                                    >
                                        <option selected="-1">Choose a city</option>
                                        <option value='Surat'>Surat</option>
                                        <option value='Ahmedabad'>Ahmedabad</option>
                                        <option value='Vadodara'>Vadodara</option>
                                    </select>

                                    <span className='error_message'> {props.touched.city && props.errors.city ? (
                                        <div>{props.errors.city}</div>
                                    ) : null}</span>
                                </div>

                                <div class="col-md-4 my-3">
                                    <label for="inputState" class="form-label">State</label>
                                    <select 
                                    id="inputState" 
                                    class="form-select"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                        value={props.values.state}
                                        name="state"
                                        >
                                        <option selected="-1">Choose a city</option>
                                        <option value='Gujarat'>Gujarat</option>
                                        <option value='Maharshtra'>Maharshtra</option>
                                        <option value='Rajasthan'>Rajasthan</option>
                                    </select>
                                    <span className='error_message'> {props.touched.state && props.errors.state ? (
                                        <div>{props.errors.state}</div>
                                    ) : null}</span>
                                </div>

                                <div class="col-md-4 my-3">
                                    <label for="inputZip" class="form-label">Zip</label>
                                    <input 
                                    type="text" 
                                    class="form-control" 
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

                                <div class="mb-3 col-md-4">
                                    <label for="exampleInputMobNumber" class="form-label">Mobile Number</label>
                                    <input 
                                    type="text" 
                                    class="form-control" 
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
                                        value={props.values.birthDate} 
                                        onChange={handleChange} 
                                        onBlur={props.handleBlur}
                                        name="birthDate"
                                        />
                                         <span className='error_message'> {props.touched.birthDate && props.errors.birthDate ? (
                                        <div>{props.errors.birthDate}</div>
                                    ) : null}</span>
                                    </DemoContainer>
                                </LocalizationProvider>

                                <div> Gender </div>
                                <div class="form-check form-check-inline">
                                    <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    id="inlineRadio1" 
                                    value='Male' 
                                        onChange={handleChange} 
                                        onBlur={props.handleBlur}
                                        name="gender" 
                                     />

                                    <label class="form-check-label" for="inlineRadio1">Male</label>
                                    
                                </div>
                                <div class="form-check form-check-inline">
                                    <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    id="inlineRadio2" 
                                    value='Female'
                                        onChange={handleChange} 
                                        onBlur={props.handleBlur}
                                        name="gender" 
                                    />
                                    <label class="form-check-label" for="inlineRadio2">Female</label>
                                    <span className='error_message'> {props.touched.gender && props.errors.gender ? (
                                        <div>{props.errors.gender}</div>
                                    ) : null}</span>
                                </div>

                                <div className='my-2'> Hobbies </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                                    <label class="form-check-label" for="inlineCheckbox1">Cricket</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                                    <label class="form-check-label" for="inlineCheckbox2">Badminton</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
                                    <label class="form-check-label" for="inlineCheckbox3">Singing</label>
                                </div>


                                <div class="mb-3 form-check my-3">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">I agree to term and conditions</label>
                                </div>



                                <button type="submit" class="btn btn-primary">Submit</button>

                            </form>
                        </div>
                    </>
                )}
            </Formik>
        </>
    )
}

export default RegistrationForm;