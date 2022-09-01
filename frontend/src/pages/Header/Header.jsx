import React, { useEffect, useState } from 'react';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Paper } from '@mui/material';
import { HeaderStyles } from './Header.styles';
import { MdLogin, MdLogout, MdOutlineLogin, MdPerson, MdSettings } from 'react-icons/md';
import { FiMoon, FiSun } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import { PropTypes } from 'prop-types';
import { randomColor } from '../../utils/functions';
import { useCookies } from 'react-cookie';

export const Header = ({ theme, changeTheme }) => {
    const [cookies, setCookies, removeCookie] = useCookies(['token']);

    const navigate = useNavigate();

    const [user, setUser] = useState({
        loggedIn: !!cookies['token'],
        name: '',
        avatar: {
            color: '',
            text: '',
        },
    });

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const color = randomColor();

        setUser((prevUser) => ({ ...prevUser, avatar: color }));
    }, []);

    return (
        <Paper
            elevation={4}
            className={HeaderStyles.header}
        >
            <Link
                to={routes.root}
                className={HeaderStyles.logo}
            >
                <div>BEATSTAR MODS</div>
            </Link>
            <div className={HeaderStyles.buttonsOuter}>
                <div className={HeaderStyles.buttons}>
                    {!user.loggedIn && (
                        <Link
                            to={routes.login}
                            className={HeaderStyles.logo}
                        >
                            <Button
                                color='primary'
                                startIcon={<MdOutlineLogin />}
                            >
                                Login
                            </Button>
                        </Link>
                    )}
                    <IconButton onClick={handleClick}>
                        <Avatar
                            sx={{
                                bgcolor: user.avatar?.color,
                                color: user?.avatar.text,
                            }}
                        ></Avatar>
                    </IconButton>
                </div>
                <Menu
                    anchorEl={anchorEl}
                    id='account-menu'
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {user.loggedIn && (
                        <div>
                            <MenuItem>
                                <ListItemIcon>
                                    <MdPerson fontSize={20} />
                                </ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <MdSettings fontSize={20} />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <Divider />
                        </div>
                    )}
                    {!user.loggedIn && (
                        <Link to='/login'>
                            <MenuItem>
                                <ListItemIcon>
                                    <MdLogin fontSize={20} />
                                </ListItemIcon>
                                Login
                            </MenuItem>
                        </Link>
                    )}
                    <MenuItem onClick={changeTheme}>
                        <ListItemIcon>
                            {theme === 'light' ? <FiSun fontSize={20} /> : <FiMoon fontSize={20} />}
                        </ListItemIcon>
                        Change theme
                    </MenuItem>
                    {user.loggedIn && (
                        <MenuItem
                            onClick={() => {
                                removeCookie('token');
                                navigate('/login');
                            }}
                        >
                            <ListItemIcon>
                                <MdLogout fontSize={20} />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    )}
                </Menu>
            </div>
        </Paper>
    );
};

Header.propTypes = {
    theme: PropTypes.string.isRequired,
    changeTheme: PropTypes.func.isRequired,
};
