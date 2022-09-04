import { Drawer } from '@mui/material';
import React from 'react';
import { PropTypes } from 'prop-types';

export const Sidebar = ({ drawer, toggleDrawer }) => {
    return (
        <Drawer
            anchor='left'
            open={drawer.open}
            onClose={() => toggleDrawer((prev) => !prev)}
        >
            {/* {list(anchor)} */}
        </Drawer>
    );
};

Sidebar.propTypes = {
    drawer: PropTypes.object.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
};
