import { Box, Paper } from '@mui/material';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineImage } from 'react-icons/md';
import { toast } from 'react-toastify';
import { GS } from '../../../assets/global.styles';
import { UploadSongContext } from './UploadSong';

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    aspectRatio: '1/1',
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: 'dashed',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
};

const imageSize = 512;
const showcaseImageSize = 204;

export const UploadImage = () => {
    const [borderColor, setBorderColor] = useState('');
    const { state, dispatch } = useContext(UploadSongContext);
    const { image, imageName } = state;

    const onDrop = useCallback((acceptedFiles) => {
        const reader = new FileReader();

        reader.readAsDataURL(acceptedFiles[0]);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                // check if image size is under 2MB
                if (img.width === imageSize && img.height === imageSize && acceptedFiles[0].size < 2000000) {
                    dispatch({
                        type: 'SET_FIELD',
                        field: 'image',
                        payload: reader.result,
                    });
                    dispatch({
                        type: 'SET_FIELD',
                        field: 'imageName',
                        payload: acceptedFiles[0].name,
                    });
                } else {
                    toast.error('Invalid image file!');
                }
            };
        };
    }, []);

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/png': [] },
    });

    const style = useMemo(() => {
        setBorderColor(
            isDragAccept ? 'success.main' : isDragReject ? 'error.main' : isDragActive ? 'primary.main' : '',
        );

        return {
            ...baseStyle,
        };
    }, [isFocused, isDragAccept, isDragReject]);

    return !image ? (
        <Paper
            elevation={6}
            sx={{
                padding: '10px',
                height: 'max-content',
                width: `${showcaseImageSize}px`,
                borderRadius: '5px',
            }}
        >
            <Box
                sx={{
                    borderColor: borderColor,
                }}
                {...getRootProps({ style })}
            >
                <input {...getInputProps()} />
                <span className={[GS.textCenter, GS.center, GS.gap(4)].join(' ')}>
                    <MdOutlineImage fontSize={30} /> Drop your image here
                </span>
            </Box>
            <p style={{ fontSize: '13px', marginTop: '10px', opacity: 0.4, userSelect: 'none' }}>
                * Size: {imageSize}x{imageSize}, format: PNG
            </p>
        </Paper>
    ) : (
        <Paper
            elevation={6}
            sx={{
                padding: '10px',
                width: `${showcaseImageSize}px`,
                height: 'max-content',
                borderRadius: '5px',
            }}
        >
            <Box
                sx={{
                    borderColor: borderColor,
                    cursor: 'pointer',
                }}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <img
                    src={image}
                    alt='song'
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '5px',
                    }}
                />
            </Box>
            <p style={{ fontSize: '13px', opacity: 0.4, userSelect: 'none' }}>{imageName}</p>
        </Paper>
    );
};
