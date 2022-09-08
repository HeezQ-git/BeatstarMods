import { Button, Divider, Grid, Paper } from '@mui/material';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AppContext } from '../../App';
import { GS } from '../../assets/global.styles';
import { routes } from '../../config/routes';
import { userService } from '../../services/user.service';
import { WorkshopStyles } from './Workshop.styles';

export const WorkshopContext = createContext();

export const Workshop = () => {
    const navigate = useNavigate();

    const { user } = useContext(AppContext);

    const uploadSong = () => {
        if (!user?.isVerified) {
            return toast.error('Only verified users can upload songs!', {
                toastId: 'uploadSong',
            });
        }

        navigate(routes.uploadSong);
    };

    return (
        <Grid
            container
            alignItems='center'
            justifyContent='center'
            className={GS.animation('swipeToBottom')}
        >
            <Grid
                item
                xs={12}
                md={10}
                py={{
                    xs: 2,
                }}
            >
                <Paper className={GS.paper}>
                    <div className={WorkshopStyles.title}>
                        <span className={GS.title}>Workshop</span>
                        <Button
                            variant='contained'
                            startIcon={<MdOutlineAdd />}
                            onClick={uploadSong}
                        >
                            Add new song
                        </Button>
                    </div>
                    <Divider />
                </Paper>
            </Grid>
        </Grid>
    );
};
