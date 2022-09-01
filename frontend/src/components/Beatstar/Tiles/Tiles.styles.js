/* eslint-disable indent */
import { css, keyframes } from '@emotion/css';

const polygons = [
    'clip-path: polygon(78% 13%, 28% 74%, 73% 54%);',
    'clip-path: polygon(71% 46%, 56% 25%, 43% 76%);',
    'clip-path: polygon(19% 5%, 12% 49%, 90% 87%);',
    'clip-path: polygon(78% 13%, 29% 33%, 85% 85%);',
    'clip-path: polygon(100% 100%, 66% 19%, 20% 11%);',
    'clip-path: polygon(79% 51%, 80% 30%, 21% 48%);',
    'clip-path: polygon(48% 75%, 79% 88%, 23% 21%);',
    'clip-path: polygon(48% 75%, 44% 39%, 23% 21%);',
];

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min), 1) + min;
};

const randomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

export const glassPieces = [];

[...Array(20)].map(() => {
    glassPieces.push({
        value: randomElement(polygons),
        top: randomNumber(30, 65),
        left: randomNumber(10, 90),
        rotate: `rotate(${randomNumber(0, 360)}deg)`,
    });
});

export const TilesStyles = {
    stageTile: (color = '#151c1d') => css`
        position: relative;
        user-select: none;
        width: 80px;
        height: 105px;
        border-radius: 10px;
        background: #151c1d;
        border: 5px solid ${color};
        filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
        &:before {
            content: '';
            position: absolute;
            background: linear-gradient(to bottom, ${color}39 0%, ${color} 80%, rgba(255, 255, 255, 0.1) 120%);
            height: 85px;
            width: 4.5px;
            top: 5px;
            left: -5px;
            filter: brightness(120%) blur(0.5px);
        }
        &:after {
            content: '';
            position: absolute;
            background: ${color}99;
            height: 12px;
            width: 12px;
            bottom: -5px;
            right: -5px;
            filter: brightness(140%) blur(0.5px);
            border-bottom-right-radius: 75%;
            clip-path: polygon(100% 1%, 0% 100%, 100% 100%);
        }
    `,
    circleTile: css`
        display: block;
        position: absolute;
        width: 51px;
        height: 51px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: #fff;
    `,
    circleText: css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 9px;
        font-family: 'Kiona', sans-serif;
        color: #121415;
        font-weight: bold;
    `,
    tile: css`
        position: relative;
        user-select: none;
        width: 80px;
        height: 105px;
        border-radius: 10px;
        background: #151c1d;
        border: 5px solid #151c1d;
        border-left: 5px solid #44464a8c;
        border-right: 5px solid #44464a33;
        border-top: 3px solid #292d3340;
        border-bottom: 3px solid #292d331a;
        border-top-left-radius: 6px;
        filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
    `,
    line: (color) => css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70%;
        height: 5px;
        background: #f9f9f9f1;
        box-shadow: 0px 0px 10px 2.5px ${color};
        filter: brightness(200%);
    `,
    VFX: (color, piece) => css`
        ${glassPieces[piece]?.value}
        background: ${color}56;
        border: 2px solid ${color};
        position: absolute;
        top: ${glassPieces[piece]?.top}%;
        left: ${glassPieces[piece]?.left}%;
        width: 10px;
        height: 10px;
        border-radius: 3px;
        filter: drop-shadow(0px 0px 2px ${color}) brightness(80%) greyScale(90%);
        transform: ${glassPieces[piece]?.rotate};
        animation: ${anim.floatToTop} ${randomNumber(1000, 2000)}ms 15 ease both;
    `,
};

const anim = {
    floatToTop: keyframes`
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;

        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-${randomNumber(17, 22)}px) rotate(${randomNumber(-180, 180)}deg);
            opacity: 0;
        }
        `,
};

export const PerfectBarStyles = {
    perfectBarBox: css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 135px;
        width: 325px;
        box-shadow: inset 0px 0px 14px 0px rgba(0, 0, 0, 0.6);
        border-radius: 10px; ;
    `,
    perfectBar: (color) => css`
        width: 94%;
        height: 60%;
        background: ${color ? color : 'linear-gradient(180deg, rgba(232,234,238,1) 0%, rgba(182,183,195,1) 100%)'};
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        letter-spacing: 9px;
        gap: 1px;
        font-size: 11.5px;
        font-weight: 200;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.6);
        border-top: 1px solid #f9f9f968;
        color: ${color ? '#f9f9f9' : '#a6a5ad'};
        user-select: none;
        & > span {
            opacity: 0.8;
        }
    `,
    line: (color) => css`
        width: 75%;
        height: 1px;
        opacity: 0.8;
        background: ${color
            ? 'linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(250, 248, 246, 1) 20%, rgba(255, 255, 255, 1) 80%, rgba(255, 255, 255, 0) 100%)'
            : 'linear-gradient( 90deg, #a6a5ad00 0%, #a6a5ad 20%, #a6a5ad 80%, #a6a5ad00 100%)'};
    `,
};
