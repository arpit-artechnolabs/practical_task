import React, { useRef, useState } from 'react'
import Navbar from './Navbar'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { passwordChange } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

const PasswordChange = () => {
    const navigate=useNavigate()
    const passwordRef = useRef()
    const [data] = useState({
        "current_password": "",
        "password": "",
        "confirm_password": ""
    })
    const [error, setError] = useState('')

    const LoginSchema = Yup.object({
        current_password: Yup.string()
            .required("This field is required*")
            .matches(
                // eslint-disable-next-line no-useless-escape
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character."
            ),
        password: Yup.string()
            .required("This field is required*")
            .matches(
                // eslint-disable-next-line no-useless-escape
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character."
            ),
        confirm_password: Yup.string()
            .required('This is required field*')
            .oneOf([Yup.ref('password'), null], 'Password and confirm password must match.'),

    });

    const handleSubmitForm = async (values) => {
        const {current_password,password,confirm_password}=values
        
        let passwordData={
            "current_password": current_password,
            "password": password,
            "password_confirmation": confirm_password
        }
        passwordChange(passwordData)
        .then((res) => {
            console.log(res);
            window.alert('Your password is updated successfully.')
            navigate('/')

        })
        .catch((error) => {
            console.log(error);
        })

    }

    return (
        <>
            <Navbar />

            <div className='container rounded-2 border border-secondary-subtle my-5'>
                <h3 className='my-2 col-md-4 text-primary'>Change Password</h3>
                <Formik
                    initialValues={data}
                    enableReinitialize={true}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => handleSubmitForm(values)}
                >
                    {(props) => (

                        <>
                            <form onSubmit={props.handleSubmit} className='my-3'>
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="exampleInputCurrentPassword" className="form-label">Current Password</label>
                                    <input name="current_password" type="password" className="form-control" id="exampleInputCurrentPassword" aria-describedby="CurrentPasswordHelp" value={props?.valucurrent_password} onBlur={props?.handleBlur}
                                        onChange={props.handleChange} />
                                    <span className="login_error_message">  {props?.touched.current_password && props?.errors?.current_password ? props?.errors?.current_password : null}</span>

                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input name='password' type="password" className="form-control" ref={passwordRef} id="exampleInputPassword1" value={props?.values?.password} onChange={props.handleChange} onBlur={props?.handleBlur} />
                                    <span className="login_error_message">  {props?.touched.password && props?.errors.password ? props?.errors?.password : null}</span>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="exampleInputConfirmPassword" className="form-label">Confirm Password</label>
                                    <input name='confirm_password' type="password" className="form-control" ref={passwordRef} id="exampleInputConfirmPassword" value={props?.values?.confirm_password} onChange={props.handleChange} onBlur={props?.handleBlur} />
                                    <span className="login_error_message">  {props?.touched.confirm_password && props?.errors.confirm_password ? props?.errors?.confirm_password : null}</span>
                                </div>
                                <h6 className="col-md-4 wrong-crednetial-message">{error && error}</h6>
                                <button className="btn btn-primary mx-2" onClick={()=>navigate('/')}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default PasswordChange