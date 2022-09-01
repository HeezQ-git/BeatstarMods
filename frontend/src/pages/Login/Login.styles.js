import { css } from '@emotion/css';
import { green } from '@mui/material/colors';

export const LoginStyles = {
    root: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
    `,
    paper: css`
        padding: 20px;
        min-height: 450px;
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    protected: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 3px;
        color: ${green[500]};
        user-select: none;
        opacity: 68%;
    `,
    loginFields: css`
        padding-block: 25px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        width: 80%;
    `,
    loginButtonsOuter: css`
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    loginButtons: css`
        margin-block: 10px;
        display: flex;
        flex-direction: row;
        gap: 10px;
    `,
    divider: css`
        width: 100%;
        margin: 10px;
    `,
    membership: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        gap: 8px;
    `,
};
