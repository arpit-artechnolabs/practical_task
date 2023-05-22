import React, { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const RegistrationForm = () => {

    const [date, setDate] = useState(null)
    const handleChange = (Date) => {
        setDate(Date)
        console.log(Date);
        console.log(Date.$D, Date.$M + 1, Date.$y);
    }
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

                    <div class="mb-3">
                        <label for="exampleInputSurname" class="form-label">Surname</label>
                        <input type="text" class="form-control" id="exampleInputSurname" aria-describedby="SurnameHelp" />
                    </div>

                    <div class="mb-3">
                        <label for="inputAddress" class="form-label">Address Line 1</label>
                        <input type="text" class="form-control" id="inputAddress" />
                    </div>
                    <div class="mb-3">
                        <label for="inputAddress2" class="form-label">Address Line 2</label>
                        <input type="text" class="form-control" id="inputAddress2" />
                    </div>

                    <div class="col-md-6">
                        <label for="inputCity" class="form-label">City</label>
                        <input type="text" class="form-control" id="inputCity" />
                    </div>

                    <div class="col-md-4 my-3">
                        <label for="inputState" class="form-label">State</label>
                        <select id="inputState" class="form-select">
                            <option selected="-1">Choose a city</option>
                            <option value='Gujarat'>Gujarat</option>
                            <option value='Maharshtra'>Maharshtra</option>
                            <option value='Rajasthan'>Rajasthan</option>
                        </select>
                    </div>

                    <div class="col-md-2 my-3">
                        <label for="inputZip" class="form-label">Zip</label>
                        <input type="text" class="form-control" id="inputZip" />
                    </div>

                    <div class="mb-3 col-md-3">
                        <label for="exampleInputMobNumber" class="form-label">Mobile Number</label>
                        <input type="text" class="form-control" id="exampleInputMobNumber" aria-describedby="MobNumberHelp" />
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Select Date of birth" value={date} onChange={(date) => handleChange(date)} />
                        </DemoContainer>
                    </LocalizationProvider>

                    <div className='my-2'> Gender </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label class="form-check-label" for="inlineRadio1">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                        <label class="form-check-label" for="inlineRadio2">Female</label>
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
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"  />
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
    )
}

export default RegistrationForm;