import { Button, CircularProgress, Divider, Grid, TextField, Tooltip } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { MdDone, MdDownload, MdInfoOutline, MdSave } from 'react-icons/md';
import { toast } from 'react-toastify';
import { userService } from '../../../../services/user.service';
import { ConfigContext } from '../ConfigCreator';
import { StepManagerStyles } from '../ConfigCreator.styles';

export const Result = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [saved, setSaved] = useState(false);

    const { state } = useContext(ConfigContext);

    const newConfig = () => ({
        SONG_TEMPLATE: {
            BaseColor: state.BaseColor.color.replace(/#/g, ''),
            DarkColor: state.DarkColor.color.replace(/#/g, ''),
            ColorGradient: state.ColorGradient.gradient
                .filter((item) => !state.ColorGradient.toRemoved.includes(item.id))
                .map((item) => ({
                    color: item.color.replace(/#/g, ''),
                    time: item.time,
                })),
            CheckpointOutlineColour: state.CheckpointOutlineColour.color.replace(/#/g, ''),
            ColorGradientInGame: state.ColorGradientInGame.gradient
                .filter((item) => !state.ColorGradientInGame.toRemoved.includes(item.id))
                .map((item) => ({
                    color: item.color.replace(/#/g, ''),
                    time: item.time,
                })),
            StreakConfig: state.StreakConfig.streak.map((item) => ({
                glowColor: item.glowColor.replace(/#/g, ''),
                perfectBarColor: item.perfectBarColor.replace(/#/g, ''),
                invertPerfectBar: `${item.invertPerfectBar}`,
                VFXColor: item.VFXColor.replace(/#/g, ''),
            })),
            TrackIntensityGlow: state.TrackIntensityGlow.color.replace(/#/g, ''),
            VFXColor: state.VFXColor.color.replace(/#/g, ''),
            VFXAlternativeColor: state.VFXAlternativeColor.color.replace(/#/g, ''),
        },
    });

    const createFinalConfig = async () => {
        const config = JSON.stringify(newConfig(), null, 4);
        const blob = new Blob([config], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        setFile(url);
        setLoading(false);
        return !!url;
    };

    const downloadFile = () => {
        const link = document.createElement('a');

        link.href = file;
        link.download = 'config.json';
        link.click();
    };

    const saveConfig = async () => {
        const config = newConfig();
        const configString = JSON.stringify(config, null, 4);

        try {
            const { data } = await toast.promise(
                userService.saveConfig({ config: configString, name }),
                {
                    pending: 'Saving config...',
                    success: `Config ${name ? `"${name}"` : ''} saved!`,
                    error: {
                        render({ data }) {
                            return `${data.response.data.errorInfo.msg}`;
                        },
                    },
                },
                {
                    toastId: 'saveConfig',
                },
            );

            if (data.success) {
                setSaved(true);
            }
            // eslint-disable-next-line no-empty
        } catch (error) {}
    };

    useEffect(() => {
        createFinalConfig();
    }, []);

    return (
        <div style={{ paddingTop: '20px' }}>
            {loading ? (
                <div className={StepManagerStyles.loading}>
                    <CircularProgress />
                    Creating your config.json file...
                </div>
            ) : (
                <Grid
                    flexDirection={{ xs: 'column', md: 'row' }}
                    className={StepManagerStyles.rootBox}
                >
                    <div className={StepManagerStyles.resultBox}>
                        <h2>&#127881; Hurray!</h2>
                        <div
                            className={StepManagerStyles.subBox}
                            style={{ gap: '30px' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>Your config.json file is ready!</span>
                                <span>Place it in your song folder and you&apos;re ready to go!</span>
                            </div>
                            <div>
                                <Button
                                    startIcon={<MdDownload />}
                                    variant='outlined'
                                    onClick={downloadFile}
                                >
                                    Download
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Divider
                            sx={{
                                marginBlock: '10px',
                                display: {
                                    xs: 'block',
                                    md: 'none',
                                },
                            }}
                        />
                        <Divider
                            orientation='vertical'
                            sx={{
                                marginInline: '10px',
                                display: {
                                    xs: 'none',
                                    md: 'block',
                                },
                            }}
                        />
                    </div>
                    <div className={StepManagerStyles.resultBox}>
                        <h2>&#x2728; Everything is ready!</h2>
                        <span>Would you like to save this config in your collection?</span>
                        <div className={StepManagerStyles.subBox}>
                            <div className={StepManagerStyles.input}>
                                <TextField
                                    label='Name of the config'
                                    size='small'
                                    disabled={saved}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <span>
                                    <Tooltip title='Default naming will apply if not provided.'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <MdInfoOutline />
                                        </div>
                                    </Tooltip>
                                    (Optional)
                                </span>
                            </div>
                            <Button
                                startIcon={saved ? <MdDone /> : <MdSave />}
                                disabled={saved}
                                onClick={saveConfig}
                            >
                                {saved ? 'Saved!' : 'Save'}
                            </Button>
                        </div>
                    </div>
                </Grid>
            )}
        </div>
    );
};
