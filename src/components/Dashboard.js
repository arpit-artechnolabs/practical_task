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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { LogOut } from '../functions/Function';

const Dashboard = () => {

    // const {}
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

    const pages = ['Update Proflile','Logout'];


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = (options) => {
      setAnchorElNav(null);
    //   console.log(options);
    LogOut()
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
        <>

        {/* Navbar */}
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        {/* <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography> */}

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
                                {pages.map((page) => (                            
                                        
                                    <MenuItem key={page} onClick={(page)=>handleCloseNavMenu(page)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                    
                                
                                    ))}
                            </Menu>
                        </Box>
                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                        {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {/* <Tooltip title="Open settings"> */}
                            {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            {/* </IconButton> */}
                            {/* </Tooltip> */}
                            {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
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