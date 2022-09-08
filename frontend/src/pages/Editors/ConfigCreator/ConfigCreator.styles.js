import { css, keyframes } from '@emotion/css';

export const ConfigCreatorStyles = {
    colorSelectors: css`
        display: flex;
        justify-content: space-evenly;
    `,
    gradient: (baseColor, darkColor) => css`
        background: linear-gradient(${baseColor}, ${darkColor});
        width: 75px;
        height: 75px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
    `,
    gradientBox: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    `,
};

export const SelectorScreenStyles = {
    card: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        margin: 20px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        height: 90%;
        &:hover {
            & > div > img {
                transform: scale(1.42);
            }
        }
    `,
    configFileImage: css`
        width: 100%;
        height: auto;
        transform: scale(1.35);
    `,
    imageBox: css`
        overflow: hidden;
        border-radius: 10px;
    `,
    selectorBox: css`
        display: flex;
    `,
    title: css`
        margin-top: 15px;
        font-size: 18px;
        font-weight: bold;
        text-align: left;
    `,
};

export const StepManagerStyles = {
    root: css`
        display: flex;
    `,
    note: css`
        margin-top: 5px;
        font-size: 14px;
        text-align: center;
        opacity: 0.4;
        user-select: none;
    `,
    gradientPreview: (gradient, size = 200, type = 'radial') => css`
        width: ${size}px;
        aspect-ratio: 1;
        border: 1px solid #212121;
        border-radius: 10px;
        // prettier-ignore
        background: ${type}-gradient(
                ${type === 'radial' ? 'circle' : '0deg'},
                ${gradient.map((color) => `${color.color} ${color.time * 115}%`).join(', ')});
    `,
    grid: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
    `,
    gridBox: css`
        width: 80%;
        padding: 10px;
    `,
    gridItem: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        & > div {
            display: flex;
            align-items: center;
        }
    `,
    color: css`
        gap: 20px;
        & > div {
            cursor: default;
        }
    `,
    showcaseColor: (color, size = 30) => css`
        width: ${size}px;
        height: ${size}px;
        border-radius: 5px;
        background: ${color};
        border: 1px solid #212121;
    `,
    addColorIcon: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
    `,
    colorBox: (color) => css`
        width: 100%;
        height: 50px;
        border-radius: 10px;
        filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
        background: ${color};
    `,
    undoButton: css`
        display: flex;
        align-items: center;
        gap: 25px;
    `,
    rootBox: css`
        display: flex;
        justify-content: space-around;
        padding-block: 20px;
    `,
    resultBox: css`
        display: flex;
        flex-direction: column;
        gap: 15px;
    `,
    subBox: css`
        display: flex;
        flex-direction: column;
        gap: 10px;
    `,
    loading: css`
        display: flex;
        align-items: center;
        gap: 20px;
        margin-left: 20px;
    `,
    input: css`
        display: flex;
        flex-direction: column;
        & > span {
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 4px;
            opacity: 0.6;
            font-size: 14px;
        }
    `,
};

export const CollectionStyles = {
    coloredBoxRoot: css`
        display: flex;
        align-items: center;
        gap: 5px;
    `,
    coloredBox: (color) => css`
        width: 20px;
        height: 20px;
        border-radius: 3px;
        background: #${color};
        border: 1px solid #ffffff60;
    `,
    tableCellTrucate: css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `,
};

const anim = keyframes`
    0% {
        background-position: 0px 0px, 300px 116px, 0px 150px, 216px 0px;
    }
    100% {
        background-position: 300px 0px, 0px 116px, 0px 0px, 216px 150px;
    }
`;

export const UploadConfigStyles = {
    baseStyle: css`
        display: flex,
        flexDirection: column,
        alignItems: center,
        padding: 20px,
        borderWidth: 2,
        borderRadius: 2,
        borderStyle: dashed,
        outline: none,
        transition: border .24s ease-in-out,
        cursor: pointer,
        &:hover {
            animation: ${anim} 1s linear infinite;
        }
    `,
    focusedStyle: css`
        bordercolor: #2196f3;
    `,
    acceptStyle: css`
        bordercolor: success.main;
    `,
    rejectStyle: css`
        bordercolor: #ff1744;
    `,
};
