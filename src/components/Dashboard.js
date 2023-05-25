import React, { useEffect, useState } from 'react'
import { deleteUser, getAllUserData, selectedUserData } from '../services/UserService'
import { encryptStorage1 } from '../utility/Storage';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Dashboard = () => {
    let currentUser = encryptStorage1.getItem('userData');
    const navigate=useNavigate()
    const [usersData, setUsersData] = useState([])
    const [loading, setLoading] = useState(false)

    const userDataFuntion = async () => {
        setLoading(true)
        let res = await getAllUserData()
        console.log(res);
        setLoading(false)

        if (res.status === 200) {
            setUsersData(res?.data)
        }
    }


    useEffect(() => {
        userDataFuntion()
    }, [])


    const filterData = usersData.length > 0 && usersData?.filter((el, I) => (el.id !== currentUser.id))

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this user ?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then(async (result) => {

            if (result.isConfirmed) {
                let res = await deleteUser(id)
                console.log(res);
                userDataFuntion()
            }
        })
    }

    const handleUpdate = (data) => {

        navigate('/update-profile',{
            state:{
                userData:data
            }
        })
    }

    const hanldeViewData=(data)=>{
        console.log(data);
        navigate('/viewprofile',{
            state:{
                userData:data
            }
        })
    }

    return (
        <>
            <Navbar/>

            {/* UsersData */}
            <div className='container my-4'>

                {loading ? <h6>Loading...</h6> :
                    <>
                        {filterData.length === 0 ? <h6>No records found.</h6> :
                            <table className="table table-bordered border-primary border border-secondary-subtle">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr.No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Birthdate</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Hobby</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>

                                <tbody  >
                                    {filterData?.length > 0 && filterData.map((el, I) => {
                                        const { id, name, middlename, surname, email, phone, address_line1, address_line2, city, state, birth_date, gender, hobby } = el;

                                        return (
                                            <React.Fragment key={id}>
                                                <tr >
                                                    <th scope="row">{I + 1}</th>
                                                    <td>{`${name} ${middlename} ${surname}`}</td>
                                                    <td>{email}</td>
                                                    <td>{phone}</td>
                                                    <td>{`${address_line1} ${address_line2} ${city} ${state}`}</td>
                                                    <td>{birth_date}</td>
                                                    <td>{gender}</td>
                                                    <td>{hobby}</td>
                                                    <td>
                                                        <button onClick={()=>hanldeViewData(el)} >View Profile</button>
                                                        <button onClick={() => handleUpdate(el)}>Update Proflile</button>
                                                        <button onClick={() => handleDelete(id)}>Delete Proflile</button>
                                                    </td>
                                                </tr>

                                            </React.Fragment>
                                        )
                                    })}

                                </tbody>
                            </table>
                        }
                    </>
                }
            </div>

        </>
    )
}

export default Dashboard;