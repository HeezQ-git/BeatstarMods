import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { MdOutlineEdit, MdOutlineInsertDriveFile } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GS } from '../../../assets/global.styles';
import { routes } from '../../../config/routes';
import { SelectorScreenStyles } from './ConfigCreator.styles';
import configFileImageEdit from '../../../assets/images/config-file-edit.png';
import configFileImageCreate from '../../../assets/images/config-file-create.png';

export const SelectorScreen = () => {
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
            >
                <Paper className={GS.paper}>
                    <span className={[GS.title, GS.textCenter].join(' ')}>Select an option</span>
                    <Divider />
                    <Grid
                        item
                        justifyContent={'space-evenly'}
                        flexDirection={{ xs: 'column', md: 'row' }}
                        className={SelectorScreenStyles.selectorBox}
                    >
                        <span className={GS.textCenter}>
                            <Paper
                                elevation={8}
                                className={SelectorScreenStyles.card}
                            >
                                <div className={SelectorScreenStyles.imageBox}>
                                    <img
                                        src={configFileImageCreate}
                                        className={[
                                            SelectorScreenStyles.configFileImage,
                                            GS.transitions.default(0.2),
                                        ].join(' ')}
                                    />
                                </div>
                                <span className={SelectorScreenStyles.title}>Create new config</span>
                                <Typography
                                    color='text.secondary'
                                    sx={{ fontSize: 14, textAlign: 'left' }}
                                >
                                    Create a brand new config for your chart!
                                </Typography>
                                <Box
                                    textAlign='right'
                                    mt='10px'
                                >
                                    <Link to={routes.configCreator}>
                                        <Button startIcon={<MdOutlineInsertDriveFile />}>Create</Button>
                                    </Link>
                                </Box>
                            </Paper>
                        </span>
                        <span className={GS.textCenter}>
                            <Paper
                                elevation={8}
                                className={SelectorScreenStyles.card}
                            >
                                <div className={SelectorScreenStyles.imageBox}>
                                    <img
                                        src={configFileImageEdit}
                                        className={[
                                            SelectorScreenStyles.configFileImage,
                                            GS.transitions.default(0.2),
                                        ].join(' ')}
                                    />
                                </div>
                                <span className={SelectorScreenStyles.title}>Edit existing config</span>
                                <Typography
                                    color='text.secondary'
                                    sx={{ fontSize: 14, textAlign: 'left' }}
                                >
                                    Edit an existing config or upload your own!
                                </Typography>
                                <Box
                                    textAlign='right'
                                    mt='10px'
                                >
                                    <Link to={routes.editConfig}>
                                        <Button startIcon={<MdOutlineEdit />}>Edit</Button>
                                    </Link>
                                </Box>
                            </Paper>
                        </span>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};
