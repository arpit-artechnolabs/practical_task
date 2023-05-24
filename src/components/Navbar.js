import React, { useContext } from 'react'
import { UserContext } from '../context/Context';
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

const Navbar = () => {

    const { userName, setUserName } = useContext(UserContext)
    const { name, middlename, surname } = userName
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
                            <span>{`${name} ${middlename} ${surname}`}</span>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

        </>
    )
}

export default Navbar