import React from 'react'

const RegistrationForm = () => {
    return (
        <>
        <div className='container my-5'>
            <form>

            <div class="mb-3">
                    <label for="exampleInputName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="exampleInputName" aria-describedby="NameHelp" />
                </div>

                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>

                <div class="mb-3">
                    <label for="exampleInputCPassword1" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputCPassword1" />
                </div>


                <div class="mb-3">
                    <label for="exampleInputMiddleName" class="form-label">Middle Name</label>
                    <input type="text" class="form-control" id="exampleInputMiddleName" aria-describedby="MiddleNameHelp" />
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                
                <button type="submit" class="btn btn-primary">Submit</button>
                
            </form>
            </div>
        </>
    )
}

export default RegistrationForm;