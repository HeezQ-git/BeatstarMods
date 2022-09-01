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
