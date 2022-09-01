import { Box } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

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
        console.log(acceptedFiles);
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            console.log(text);
            alert(text);
        };
        reader.readAsText(acceptedFiles[0]);
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
        <Box
            sx={{
                width: '100%',
                marginTop: '15px',
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
    );
};
