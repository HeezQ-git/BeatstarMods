import { Box, Button, Divider, Grid, Paper, Tooltip } from '@mui/material';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { MdDone, MdOutlineVerifiedUser } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { AppContext } from '../../../App';
import { GS } from '../../../assets/global.styles';
import { routes } from '../../../config/routes';
import { uploadSongInitialState } from '../../../config/variables';
import { uploadSongReducer } from '../../../hooks/uploadSongReducer';
import { WorkshopStyles } from '../Workshop.styles';
import { UploadSongForm } from './Form';
import { UploadImage } from './UploadImage';

export const UploadSongContext = createContext();

export const UploadSong = () => {
    const { user } = useContext(AppContext);
    const [isReady, setReady] = useState(false);
    const [state, dispatch] = useReducer(uploadSongReducer, uploadSongInitialState);

    const navigate = useNavigate();

    const UploadSongContextValues = {
        state,
        dispatch,
    };

    useEffect(() => {
        if (!user?.isVerified) {
            navigate(routes.workshop);
        } else {
            setReady(true);
        }
    }, []);

    return (
        isReady && (
            <UploadSongContext.Provider value={UploadSongContextValues}>
                <Grid
                    container
                    alignItems='center'
                    justifyContent='center'
                    className={GS.animation('swipeToBottom')}
                >
                    <Grid
                        item
                        xs={12}
                        lg={8}
                        xl={7}
                        py={{
                            xs: 2,
                        }}
                    >
                        <Paper className={GS.paper}>
                            <div className={[GS.center, GS.gap(8)].join(' ')}>
                                <Tooltip title='Only verified users can upload songs'>
                                    <span className={GS.center}>
                                        <MdOutlineVerifiedUser
                                            fontSize={20}
                                            style={{ color: '#28B032' }}
                                        />
                                    </span>
                                </Tooltip>
                                <span className={GS.title}>Upload a new song to workshop</span>
                            </div>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Grid
                                    display='flex'
                                    flexDirection={{
                                        xs: 'column',
                                        md: 'row',
                                    }}
                                    alignItems={{
                                        xs: 'center',
                                        md: 'flex-start',
                                    }}
                                    justifyContent='space-evenly'
                                    marginTop='15px'
                                    gap='15px'
                                >
                                    <UploadImage />
                                    <UploadSongForm />
                                </Grid>
                                <Button
                                    sx={{ marginTop: '30px', alignSelf: 'flex-end' }}
                                    variant='contained'
                                    startIcon={<MdDone />}
                                    form='upload-song'
                                    type='submit'
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </UploadSongContext.Provider>
        )
    );
};
