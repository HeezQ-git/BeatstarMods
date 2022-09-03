import React, { useEffect, useState } from 'react';
import { userService } from '../../../services/user.service';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { MdAdd, MdDelete, MdEdit, MdRefresh } from 'react-icons/md';
import { CollectionStyles } from './ConfigCreator.styles';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { routes } from '../../../config/routes';
import { useNavigate } from 'react-router';

export const ConfigCollection = ({ setSelectedConfigId }) => {
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState([]);
    const [confirmMenu, setConfirmMenu] = useState(false);
    const [pageSize, setPageSize] = useState(5);

    const navigate = useNavigate();

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            editable: true,
        },
        {
            field: 'created',
            headerName: 'Created',
            width: 150,
        },
        {
            field: 'updated',
            headerName: 'Last update',
            width: 150,
        },
        {
            field: 'colors',
            headerName: 'Colors',
            width: 175,
            sortable: false,
            renderCell: (params) => (
                <div className={CollectionStyles.coloredBoxRoot}>
                    {params.row.colors.map((color, index) => (
                        <div
                            key={color + index}
                            className={CollectionStyles.coloredBox(color)}
                        />
                    ))}
                </div>
            ),
        },
        {
            field: 'select',
            headerName: 'Action',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <div style={{ display: 'flex', gap: '15px' }}>
                    <Button
                        variant='contained'
                        startIcon={<MdEdit />}
                        size='small'
                        onClick={() => setSelectedConfigId(params.row.id)}
                    >
                        Edit
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
        setLoading(true);

        const { data } = await userService.getConfigs();

        setCollection(
            data.configs.map((config) => {
                const path = JSON.parse(config.fileValue).SongTemplate;

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

        setLoading(false);
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
    };

    const handleEditCommit = async (params, event) => {
        if (!event.target.value || params.value === event.target.value) {
            return;
        }

        setLoading(true);

        try {
            await toast.promise(
                userService.updateConfig({
                    configId: params.id,
                    name: event.target.value,
                    updateNameOnly: true,
                }),
                {
                    loading: 'Updating name...',
                    success: 'Name updated',
                    error: {
                        render: (err) => {
                            return err?.data?.response?.data?.errorInfo?.msg || 'Error updating name';
                        },
                    },
                },
            );
        } catch (err) {
            setLoading(false);
            return;
        }

        await getConfigs();
    };

    useEffect(() => {
        (async () => {
            await getConfigs();
        })();
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '5px',
            }}
        >
            <Tooltip
                title='Refresh'
                placement='top'
            >
                <IconButton onClick={getConfigs}>
                    <MdRefresh />
                </IconButton>
            </Tooltip>
            <Box sx={{ height: 371, width: '100%' }}>
                <DataGrid
                    rows={collection.map((item) => ({
                        ...item,
                        created: moment(new Date(item.created)).fromNow(),
                        updated: item.updated ? moment(new Date(item.updated)).fromNow() : '-',
                        select: item.id,
                    }))}
                    columns={columns}
                    disableSelectionOnClick
                    loading={loading}
                    experimentalFeatures={{ newEditingApi: true }}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => {
                        setPageSize(newPageSize);
                    }}
                    onCellEditStop={handleEditCommit}
                />
            </Box>
            <Button
                variant='contained'
                startIcon={<MdAdd />}
                sx={{ marginTop: '15px' }}
                onClick={() => navigate(routes.configCreator)}
            >
                Create new
            </Button>
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
