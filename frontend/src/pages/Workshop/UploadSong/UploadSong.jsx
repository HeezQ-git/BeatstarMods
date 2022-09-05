import { Box, Divider, Grid, Paper, Tooltip } from '@mui/material';
import React, { createContext, useReducer } from 'react';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { GS } from '../../../assets/global.styles';
import { uploadSongInitialState } from '../../../config/variables';
import { uploadSongReducer } from '../../../hooks/uploadSongReducer';
import { WorkshopStyles } from '../Workshop.styles';
import { UploadSongForm } from './Form';
import { UploadImage } from './UploadImage';

export const UploadSongContext = createContext();

export const UploadSong = () => {
    const [state, dispatch] = useReducer(uploadSongReducer, uploadSongInitialState);

    const UploadSongContextValues = {
        state,
        dispatch,
    };

    return (
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
                    md={10}
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
                        <Box>
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
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </UploadSongContext.Provider>
    );
};
