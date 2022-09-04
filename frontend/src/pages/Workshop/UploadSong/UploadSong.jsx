import { Divider, Grid, Paper, Tooltip } from '@mui/material';
import React, { createContext, useState } from 'react';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { GS } from '../../../assets/global.styles';
import { WorkshopStyles } from '../Workshop.styles';
import { UploadImage } from './UploadImage';

export const UploadSongContext = createContext();

export const UploadSong = () => {
    const [imageName, setImageName] = useState('');
    const [image, setImage] = useState(null);

    const UploadSongContextValues = {
        imageName,
        setImageName,
        image,
        setImage,
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
                        <Grid>
                            <UploadImage />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </UploadSongContext.Provider>
    );
};
