/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Button,
    Chip,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Tooltip,
} from '@mui/material';
import { HeaderStyles } from './Header.styles';
import {
    MdOutlineAdd,
    MdLogout,
    MdOutlineEdit,
    MdOutlineFeed,
    MdOutlineInsertDriveFile,
    MdOutlineLogin,
    MdPerson,
    MdSettings,
} from 'react-icons/md';
import { FiMoon, FiSun } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import { PropTypes } from 'prop-types';
import { randomColor } from '../../utils/functions';
import { useCookies } from 'react-cookie';

const Hamburger = ({ user, theme, changeTheme }) => {
    const [state, setState] = useState(false);

    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    const items = !user.loggedIn
        ? [
              {
                  label: 'Login',
                  icon: <MdOutlineLogin />,
                  link: routes.login,
              },
              {
                  label: 'Change theme',
                  icon: theme === 'light' ? <FiSun /> : <FiMoon />,
                  onClick: () => changeTheme(),
              },
          ]
        : [
              {
                  label: 'Pages',
                  type: 'divider',
              },
              {
                  label: 'Workshop',
                  icon: <MdOutlineFeed />,
                  link: routes.workshop,
                  onClick: () => setState(false),
              },
              {
                  label: 'Editors',
                  type: 'divider',
              },
              {
                  label: 'Config SS',
                  icon: <MdOutlineInsertDriveFile />,
                  link: routes.selectorScreen,
                  onClick: () => setState(false),
              },
              {
                  label: 'Create Config',
                  icon: <MdOutlineAdd />,
                  link: routes.configCreator,
                  onClick: () => setState(false),
              },
              {
                  label: 'Edit Config',
                  icon: <MdOutlineEdit />,
                  link: routes.editConfig,
                  onClick: () => setState(false),
                  beta: true,
              },
              {
                  label: 'Other',
                  type: 'divider',
              },
              {
                  label: 'Change theme',
                  icon: theme === 'light' ? <FiSun /> : <FiMoon />,
                  onClick: () => changeTheme(),
              },
          ];

    return (
        <>
            <Drawer
                anchor='left'
                open={state}
                onClose={toggleDrawer(false)}
            >
                <Grid sx={{ width: 250 }}>
                    <List>
                        {items.map((item) =>
                            item?.type === 'divider' ? (
                                <Divider key={item.label}>{item?.label || ''}</Divider>
                            ) : (
                                <ListItem
                                    key={item.label}
                                    onClick={(event) => {
                                        item?.onClick(event);

                                        if (item?.link) {
                                            navigate(item?.link);
                                        }
                                    }}
                                    disablePadding
                                    sx={{ fontSize: 20 }}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        {item?.beta ? (
                                            <ListItemText
                                                primary={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '10px',
                                                        }}
                                                    >
                                                        {item.label}
                                                        <Chip
                                                            label='BETA'
                                                            color='primary'
                                                            variant='outlined'
                                                            size='small'
                                                        />
                                                    </div>
                                                }
                                            />
                                        ) : (
                                            <ListItemText primary={item.label} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            ),
                        )}
                    </List>
                </Grid>
            </Drawer>
            <Tooltip title='Open sidebar'>
                <IconButton
                    size='large'
                    aria-label='open drawer'
                    edge='start'
                    onClick={toggleDrawer(true)}
                    sx={{ marginRight: '36px' }}
                >
                    <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M3 18H21'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M3 6H21'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M3 12H21'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </IconButton>
            </Tooltip>
        </>
    );
};

export const Header = ({ theme, changeTheme }) => {
    const [cookies, setCookies, removeCookie] = useCookies(['token']);

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
            <Grid sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <Link
                    to={routes.root}
                    className={HeaderStyles.logo}
                >
                    <div>BS MODS</div>
                </Link>
                <Hamburger
                    user={user}
                    theme={theme}
                    changeTheme={changeTheme}
                />
            </Grid>
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
                    {user.loggedIn && (
                        <MenuItem
                            onClick={() => {
                                removeCookie('token', { path: '/' });
                                window.location.href = routes.login;
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

Hamburger.propTypes = {
    user: PropTypes.object.isRequired,
    theme: PropTypes.string.isRequired,
    changeTheme: PropTypes.func.isRequired,
};
