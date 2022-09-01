import React, { useEffect, useState } from 'react';
import { userService } from '../../../services/user.service';
import { DataGrid } from '@mui/x-data-grid';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { MdDelete, MdDone } from 'react-icons/md';
import { CollectionStyles } from './ConfigCreator.styles';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

TimeAgo.addDefaultLocale(en);

export const ConfigCollection = ({ setSelectedConfigId }) => {
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState([]);
    const [confirmMenu, setConfirmMenu] = useState(false);

    const timeAgo = new TimeAgo('en-US');

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
        },
        {
            field: 'created',
            headerName: 'Created',
            width: 125,
        },
        {
            field: 'updated',
            headerName: 'Last update',
            width: 125,
        },
        {
            field: 'colors',
            headerName: 'Colors',
            width: 175,
            renderCell: (params) => (
                <div className={CollectionStyles.coloredBoxRoot}>
                    {params.row.colors.map((color) => (
                        <div
                            key={color}
                            className={CollectionStyles.coloredBox(color)}
                        />
                    ))}
                </div>
            ),
        },
        {
            field: 'select',
            headerName: 'Action',
            width: 225,
            sortable: false,
            renderCell: (params) => (
                <div style={{ display: 'flex', gap: '15px' }}>
                    <Button
                        variant='contained'
                        startIcon={<MdDone />}
                        size='small'
                        onClick={() => setSelectedConfigId(params.row.id)}
                    >
                        Select
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        startIcon={<MdDelete />}
                        size='small'
                        onClick={() => setConfirmMenu(params.row.file)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const getConfigs = async () => {
        const { data } = await userService.getConfigs();

        setCollection(
            data.configs.map((config) => {
                const path = JSON.parse(config.fileValue).SONG_TEMPLATE;

                return {
                    ...config,
                    id: config._id,
                    colors: [
                        path.BaseColor,
                        path.DarkColor,
                        path.CheckpointOutlineColour,
                        path.VFXColor,
                        path.TrackIntensityGlow,
                    ],
                };
            }),
        );

        return true;
    };

    const handleDelete = async () => {
        setConfirmMenu(false);
        setLoading(true);

        await toast.promise(userService.deleteConfig({ file: confirmMenu }), {
            loading: 'Deleting...',
            success: 'Config deleted',
            error: 'Error deleting config',
        });

        await getConfigs();

        setLoading(false);
    };

    useEffect(() => {
        (async () => {
            await getConfigs();
            setLoading(false);
        })();
    }, []);

    console.log(collection);

    return (
        <Box sx={{ height: 371, width: '100%', marginTop: '15px' }}>
            <DataGrid
                rows={collection.map((item) => ({
                    ...item,
                    created: timeAgo.format(new Date(item.created)),
                    updated: item.updated ? timeAgo.format(new Date(item.updated)) : '-',
                    select: item.id,
                }))}
                columns={columns}
                pageSize={6}
                disableSelectionOnClick
                loading={loading}
            />
            <Dialog open={!!confirmMenu}>
                <DialogTitle>Confirm action</DialogTitle>
                <DialogContent>Please remember that this process is irreversible</DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        onClick={() => setConfirmMenu(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        startIcon={<MdDelete />}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

ConfigCollection.propTypes = {
    setSelectedConfigId: PropTypes.func.isRequired,
};
