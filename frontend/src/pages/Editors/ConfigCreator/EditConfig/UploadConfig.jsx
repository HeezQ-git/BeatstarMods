import { Box, Paper } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdSaveAlt, MdUploadFile } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { routes } from '../../../../config/routes';
import { userService } from '../../../../services/user.service';
import { isJsonValid } from '../../../../utils/functions';

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: 'dashed',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
};

export const UploadConfig = () => {
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles) => {
        const reader = new FileReader();

        reader.readAsText(acceptedFiles[0]);
        reader.onload = async () => {
            try {
                if (isJsonValid(reader.result)) {
                    const { data } = await toast.promise(userService.saveConfig({ config: reader.result }), {
                        pending: 'Uploading config...',
                        success: 'Config uploaded, redirecting...',
                        error: {
                            render: (err) => {
                                return err.data?.response?.data?.errorInfo?.msg || 'Error uploading config';
                            },
                        },
                    });

                    setTimeout(() => {
                        if (data.success) {
                            navigate(`${routes.editConfig}/${data.configId}`);
                        }
                    }, 500);
                } else {
                    toast.error('Invalid config file!');
                }
            } catch (err) {
                toast.error(err);
            }
        };
    }, []);

    const [borderColor, setBorderColor] = useState('');

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/json': [] },
    });

    const style = useMemo(() => {
        setBorderColor(
            isDragAccept ? 'success.main' : isDragReject ? 'error.main' : isDragActive ? 'primary.main' : '',
        );

        return {
            ...baseStyle,
        };
    }, [isFocused, isDragAccept, isDragReject]);

    return (
        <Paper
            elevation={8}
            sx={{ padding: '10px', marginTop: '15px', width: '100%', borderRadius: '5px' }}
        >
            <Box
                sx={{
                    borderColor: borderColor,
                }}
                {...getRootProps({ style })}
            >
                <input {...getInputProps()} />
                {isDragActive && !isDragReject ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MdSaveAlt fontSize={20} /> Drop your config here
                    </span>
                ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MdUploadFile fontSize={20} /> Drag and drop your config.json file here!
                    </span>
                )}
            </Box>
            <p style={{ marginTop: '15px', opacity: 0.4, userSelect: 'none' }}>
                * Please note: if config file is not correct, some colors will not be loaded
            </p>
        </Paper>
    );
};
