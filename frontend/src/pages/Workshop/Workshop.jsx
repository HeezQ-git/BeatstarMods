import { Button, Divider, Grid, Paper } from '@mui/material';
import React, { createContext } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { GS } from '../../assets/global.styles';
import { routes } from '../../config/routes';
import { WorkshopStyles } from './Workshop.styles';

export const WorkshopContext = createContext();

export const Workshop = () => {
    const navigate = useNavigate();

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
                            onClick={() => navigate(routes.uploadSong)}
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
