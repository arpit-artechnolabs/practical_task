import React, { useEffect, useState } from 'react'
import { getAllUserData } from '../services/UserService'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { LogOut } from '../functions/Function';

const Dashboard = () => {

    const [usersData, setUsersData] = useState([])
    const [loading, setLoading] = useState(false)

    const userData = async () => {
        setLoading(true)
        let res = await getAllUserData()
        console.log(res);
        setLoading(false)

        if (res.status === 200) {
            setUsersData(res?.data)
        }
    }

    useEffect(() => {
        userData()
    }, [])

    const options = ['Update Proflile', 'Logout'];


    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (options) => {
        setAnchorElNav(null);
        if (options === "Update Proflile") {
            console.log('Update Proflile');
        }
        if (options === "Logout") {
            LogOut()
        }
    };

    return (
        <>

            {/* Navbar */}
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {options.map((option) => (

                                    <MenuItem key={option} onClick={() => handleCloseNavMenu(option)}>
                                        <Typography textAlign="center">{option}</Typography>
                                    </MenuItem>


                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {options.map((option) => (
                                <Button
                                    key={option}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {option}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            <span>arpit</span>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* UsersData */}
            <div className='container my-4'>

                {loading ? <h6>Loading...</h6> :
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
                            {usersData?.length > 0 && usersData.map((el, I) => {
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
                                                {<button>View Profile</button>}
                                                {<button>Update Proflile</button>}
                                                {<button>Delete Proflile</button>}
                                            </td>
                                        </tr>

                                    </React.Fragment>
                                )
                            })}

                        </tbody>
                    </table>
                }
            </div>

        </>
    )
}

export default Dashboard;