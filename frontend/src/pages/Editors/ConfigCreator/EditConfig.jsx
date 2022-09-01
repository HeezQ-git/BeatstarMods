import { Divider, Grid, Paper, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { GS } from '../../../assets/global.styles';
import { ConfigCollection } from './ConfigCollection';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../config/routes';
import { UploadConfig } from './UploadConfig';
import { MdList, MdUploadFile } from 'react-icons/md';

export const EditConfig = () => {
    const [value, setValue] = useState(0);
    const [selectedConfigId, setSelectedConfigId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (selectedConfigId) {
            navigate(`${routes.editConfig}/${selectedConfigId}`);
        }
    }, [selectedConfigId]);

    return (
        <Grid
            container
            alignItems='center'
            justifyContent='center'
        >
            <Grid
                item
                xs={12}
                sm={6}
                md={8}
                lg={8}
                xl={6}
                py={{
                    xs: 2,
                }}
                className={GS.animation('swipeToBottom')}
            >
                <Paper className={GS.paper}>
                    <h2>Edit config.json</h2>
                    <Divider />
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={(_, newValue) => setValue(newValue)}
                        >
                            <Tab
                                icon={<MdList fontSize={20} />}
                                iconPosition='start'
                                label='Choose from list'
                                key={0}
                            />
                            <Tab
                                icon={<MdUploadFile fontSize={20} />}
                                iconPosition='start'
                                label='Upload file'
                                key={1}
                            />
                        </Tabs>
                    </Box>
                    <div style={{ marginTop: '20px', display: value !== 0 ? 'none' : 'block' }}>
                        <span>Choose config.json from your collection to edit</span>
                        <ConfigCollection setSelectedConfigId={setSelectedConfigId} />
                    </div>
                    <div style={{ marginTop: '20px', display: value !== 1 ? 'none' : 'block' }}>
                        <UploadConfig setSelectedConfigId={setSelectedConfigId} />
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};
