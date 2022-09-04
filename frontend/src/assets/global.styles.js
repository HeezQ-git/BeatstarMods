import { css, keyframes } from '@emotion/css';

export const animations = {
    swipeToLeft: keyframes`
            from {
                transform: translateX(40px);
                            }
            to {
                transform: translateX(0px);
            }
        `,
    swipeToRight: keyframes`
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(40px);
            }
        `,
    swipeToTop: keyframes`
            from {
                transform: translateY(40px);
            }
            to {
                transform: translateY(0px);
            }
        `,
    swipeToBottom: keyframes`
            from {
                transform: translateY(-40px);
            }
            to {
                transform: translateY(0px);
            }
        `,
    fadeIn: keyframes`
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        `,
    fadeOut: keyframes`
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        `,
    fadeInUp: keyframes`
            from {
                opacity: 0;
                transform: translateY(100%);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        `,
    fadeInDown: keyframes`
            from {
                opacity: 0;
                transform: translateY(-100%);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        `,
    fadeInLeft: keyframes`
            from {
                opacity: 0;
                transform: translateX(-100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        `,
    fadeInRight: keyframes`
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        `,
    fadeOutLeft: keyframes`
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity
            `,
};

export const GS = {
    transitions: {
        default: (speed = 0.3) => css`
            transition: all ${speed}s ease;
        `,
        cubicBezier: (speed = 0.3) => css`
            transition: all ${speed}s cubic-bezier(0.25, 0.8, 0.25, 1);
        `,
        cubicBezier2: (speed = 0.3) => css`
            transition: all ${speed}s cubic-bezier(0.42, 0, 0.58, 1);
        `,
        cubicBezier3: (speed = 0.3) => css`
            transition: all ${speed}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `,
        cubicBezier4: (speed = 0.3) => css`
            transition: all ${speed}s cubic-bezier(0.22, 0.61, 0.36, 1);
        `,
        cubicBezier5: (speed = 0.3) => css`
            transition: all ${speed}s cubic-bezier(0.38, 0.57, 0.56, 1);
        `,
    },
    animation: (animation, speed = 0.5) => css`
        animation: ${animations[animation]} ${speed}s ease both;
    `,
    paper: css`
        padding: 20px;
        display: flex;
        flex-direction: column;
    `,
    divider: css`
        margin: 10px;
    `,
    title: css`
        font-size: 20px;
        font-weight: bold;
    `,
    textCenter: css`
        text-align: center;
    `,
    center: css`
        display: flex;
        align-items: center;
    `,
    gap: (size = 4) => css`
        gap: ${size}px;
    `,
};
