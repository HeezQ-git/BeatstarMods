import { Box, Paper } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { isJsonValid } from '../../../utils/functions';

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
    const onDrop = useCallback((acceptedFiles) => {
        const reader = new FileReader();

        reader.readAsText(acceptedFiles[0]);
        reader.onload = async () => {
            if (isJsonValid(reader.result)) {
                console.log(true);
            } else {
                console.log(false);
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
                    <b>Drop your config.json here!</b>
                ) : (
                    <p>Drag and drop your config.json file here!</p>
                )}
            </Box>
            <p style={{ marginTop: '15px', opacity: 0.4, userSelect: 'none' }}>
                * Please note: if config file is not correct, some colors will not be loaded
            </p>
        </Paper>
    );
};
