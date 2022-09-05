import { Autocomplete, Box, Grid, TextField } from '@mui/material';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { UploadSongContext } from './UploadSong';
import JoditEditor from 'jodit-react';
import { AppContext } from '../../../App';

export const UploadSongForm = () => {
    const { state, dispatch } = useContext(UploadSongContext);
    const { mode } = useContext(AppContext);

    const [artistsList, setArtistsList] = useState(['Hello', 'World']);

    const { title, artists, bpm, tags, description } = state;

    const editor = useRef(null);

    const config = {
        readonly: false,
        placeholder: 'Description (optional)',
        theme: mode,
        toolbarAdaptive: false,
        maxHeight: 400,
        maxWidth: 600,
        disablePlugins: 'powered-by-jodit,video,add-new-line',
        buttons:
            'bold,italic,underline,strikethrough,eraser,ul,ol,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,spellcheck,cut,copy',
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Grid>
            <form
                id='upload-song'
                onSubmit={handleSubmit}
            >
                <Grid
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    maxWidth='600px'
                    gap='15px'
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        maxWidth='600px'
                        gap='15px'
                    >
                        <TextField
                            label='Title'
                            value={title}
                            onChange={(e) =>
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'title',
                                    payload: e.target.value,
                                })
                            }
                            required
                        />
                        <JoditEditor
                            ref={editor}
                            value={description}
                            config={config}
                            tabIndex={1}
                            onBlur={(newContent) =>
                                dispatch({ type: 'SET_FIELD', field: 'description', payload: newContent })
                            }
                        />
                    </Box>
                    <Grid
                        display='flex'
                        gap='10px'
                        width='100%'
                    >
                        <Autocomplete
                            value={artists}
                            options={artistsList}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Artist(s)'
                                    fullWidth
                                />
                            )}
                            onChange={(_, newValue) =>
                                (newValue.length ? newValue?.[newValue?.length - 1]?.length < 30 : true) &&
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'artists',
                                    payload: newValue ?? [],
                                })
                            }
                            multiple
                            freeSolo
                            fullWidth
                        />
                        <TextField
                            label='BPM'
                            value={bpm}
                            type='number'
                            onChange={(e) =>
                                e.target.value >= 0 &&
                                e.target.value < 1000 &&
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'bpm',
                                    payload: e.target.value,
                                })
                            }
                            fullWidth
                        />
                    </Grid>
                    <Box width='100%'>
                        <TextField
                            label='Tags'
                            value={tags}
                            onChange={(e) =>
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'tags',
                                    payload: e.target.value,
                                })
                            }
                            fullWidth
                        />
                    </Box>
                </Grid>
            </form>
        </Grid>
    );
};
