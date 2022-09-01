export const baseConfigTypes = {
    BaseColor: {
        name: 'BaseColor',
        color: '#9e544d',
    },
    DarkColor: {
        name: 'DarkColor',
        color: '#783633',
    },
    ColorGradient: {
        name: 'ColorGradient',
        gradient: [
            { color: '#B6648D', time: 0, id: 1 },
            { color: '#896DA2', time: 0.35, id: 2 },
            { color: '#59739F', time: 0.7, id: 3 },
        ],
        toRemoved: [], // stores IDs of removed colors
    },
    CheckpointOutlineColour: {
        name: 'CheckpointOutlineColour',
        color: '#c5a8ab',
    },
    ColorGradientInGame: {
        name: 'ColorGradientInGame',
        gradient: [
            { color: '#896DA2', time: 0, id: 1 },
            { color: '#B664AE', time: 0.5, id: 2 },
            { color: '#B6648D', time: 1, id: 3 },
        ],
        toRemoved: [], // stores IDs of removed colors
    },
    StreakConfig: {
        name: 'StreakConfig',
        streak: [
            {
                glowColor: '#B6648D',
                perfectBarColor: '',
                invertPerfectBar: false,
                VFXColor: '#916179',
            },
            {
                glowColor: '#B6648D',
                perfectBarColor: '#1394B0',
                invertPerfectBar: false,
                VFXColor: '#916179',
            },
            {
                glowColor: '#B6648D',
                perfectBarColor: '#1394B0',
                invertPerfectBar: false,
                VFXColor: '#916179',
            },
            {
                glowColor: '#B6648D',
                perfectBarColor: '#1394B0',
                invertPerfectBar: false,
                VFXColor: '#916179',
            },
            {
                glowColor: '#B6648D',
                perfectBarColor: '#1394B0',
                invertPerfectBar: false,
                VFXColor: '#916179',
            },
        ],
    },
    TrackIntensityGlow: {
        name: 'TrackIntensityGlow',
        color: '#515f99',
    },
    VFXColor: {
        name: 'VFXColor',
        color: '#916179',
    },
    VFXAlternativeColor: {
        name: 'VFXAlternativeColor',
        color: '#C895AD',
    },
};
