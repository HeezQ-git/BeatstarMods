import React from 'react';
import { Paper } from '@mui/material';
import { HeaderStyles } from './Header.styles';

export const Header = () => {
    return (
        <Paper elevation={4} className={HeaderStyles.header}>
            Hello
        </Paper>
    );
};