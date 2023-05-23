import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'
import { userLogin } from '../services/UserService';
import { encryptStorage1 } from '../utility/Storage';

const Login = () => {

    const navigate = useNavigate()
    const [data] = useState({

        "email": "",
        "password": ""
    })
    const [error, setError] = useState('')

    const LoginSchema = Yup.object({
        email: Yup.string().required('This is required field*')
            // eslint-disable-next-line no-useless-escape
            .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Please enter valid email ID.'),
        password: Yup.string()
            .required("This field is required*")
            .matches(
                // eslint-disable-next-line no-useless-escape
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character."
            ),

    });


    const handleSubmitForm =async (values) => {
        const { email, password } = values
        
        const loginData = {
            "email": email,
            "password": password
        }
    
        let res=await userLogin(loginData)
        console.log(res);
        let token=(res?.data?.token);
        encryptStorage1.setItem('token',token)
        navigate('/dashboard')
    }
        

    return (
        <>

            <div className='container my-5'>
                <h3 className='d-flex justify-content-center text-primary'>Login Form</h3>
                <Formik
                    initialValues={data}
                    enableReinitialize={true}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => handleSubmitForm(values)}
                >
                    {(props) => (

                        <>
                            <form onSubmit={props.handleSubmit} className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={props?.values?.email} onBlur={props?.handleBlur}
                                        onChange={props.handleChange} />
                                    <span className="login_error_message">  {props?.touched.email && props?.errors?.email ? props?.errors?.email : null}</span>

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input name='password' type="password" className="form-control" id="exampleInputPassword1" value={props?.values?.password} onChange={props.handleChange} onBlur={props?.handleBlur} />
                                    <span className="login_error_message">  {props?.touched.password && props?.errors.password ? props?.errors?.password : null}</span>
                                </div>
                                <h6 className="error">{error && error}</h6>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </>
                    )}
                </Formik>
            </div>

        </>
    )
}

export default Login