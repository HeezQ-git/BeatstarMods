import { css } from '@emotion/css';

export const HeaderStyles = {
    header: css`
        height: 75px;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
    `,
    logo: css`
        font-size: 22px;
        font-weight: 500;
        cursor: pointer;
    `,
    buttons: css`
        * {
            height: 100%;
        }
    `,
    buttonsOuter: css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    `,
};
