import { css } from '@emotion/css';

export const ConfigDialogStyles = {
    colorBox: (color) => css`
        width: 100%;
        height: 50px;
        border-radius: 10px;
        filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
        background: ${color};
    `,
};

export const ButtonGroupStyles = {
    buttonGroup: css`
        display: flex;
        gap: 25px;
        margin-top: 20px;
    `,
    buttonGroupBox: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
        margin-top: 20px;
    `,
    colorBox: (color) => css`
        width: 75px;
        height: 75px;
        border-radius: 10px;
        filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
        background: ${color ? color : '#000000'};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
};
