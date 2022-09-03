import {
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    teal,
    green,
    amber,
    orange,
    brown,
    grey,
    blueGrey,
} from '@mui/material/colors';

export const randomColor = () => {
    const colors = [
        red,
        pink,
        purple,
        deepPurple,
        indigo,
        blue,
        lightBlue,
        teal,
        green,
        amber,
        orange,
        brown,
        grey,
        blueGrey,
    ];

    const numbers = [400, 500, 600];
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return {
        color: randomColor[randomNumber],
        text: 'white',
    };
};

export const isAscending = (array = []) => array.every((item, index) => index === 0 || +item >= +array[index - 1]);

export const isJsonValid = (json) => {
    try {
        JSON.parse(json);
    } catch (e) {
        return false;
    }
    return true;
};

export const createNewConfig = (state) => ({
    SongTemplate: {
        BaseColor: state.BaseColor.replace(/#/g, ''),
        DarkColor: state.DarkColor.replace(/#/g, ''),
        ColorGradient: state.ColorGradient.gradient
            .filter((item) => !state.ColorGradient.toRemoved.includes(item.id))
            .map((item) => ({
                color: item.color.replace(/#/g, ''),
                time: item.time,
            })),
        CheckpointOutlineColour: state.CheckpointOutlineColour.replace(/#/g, ''),
        ColorGradientInGame: state.ColorGradientInGame.gradient
            .filter((item) => !state.ColorGradientInGame.toRemoved.includes(item.id))
            .map((item) => ({
                color: item.color.replace(/#/g, ''),
                time: item.time,
            })),
        StreakConfig: state.StreakConfig.map((item) => ({
            glowColor: item.glowColor.replace(/#/g, ''),
            perfectBarColor: item.perfectBarColor.replace(/#/g, ''),
            invertPerfectBar: `${item.invertPerfectBar}`,
            VFXColor: item.VFXColor.replace(/#/g, ''),
        })),
        TrackIntensityGlow: state.TrackIntensityGlow.replace(/#/g, ''),
        VFXColor: state.VFXColor.replace(/#/g, ''),
        VFXAlternativeColor: state.VFXAlternativeColor.replace(/#/g, ''),
    },
});
