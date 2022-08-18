import React from 'react';
import { Button, IconButton, Paper, Tooltip } from '@mui/material';
import { HeaderStyles } from './Header.styles';
import { MdOutlineLogin } from 'react-icons/md';
import { FiMoon, FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { routes } from '../../config/routes';
import { PropTypes } from 'prop-types';

export const Header = ({ theme, changeTheme }) => {
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
                </div>
                <Tooltip title='Change theme'>
                    <IconButton onClick={changeTheme}>{theme === 'light' ? <FiSun /> : <FiMoon />}</IconButton>
                </Tooltip>
            </div>
        </Paper>
    );
};

Header.propTypes = {
    theme: PropTypes.string.isRequired,
    changeTheme: PropTypes.func.isRequired,
};
