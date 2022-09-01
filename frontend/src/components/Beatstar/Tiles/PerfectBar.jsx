import React from 'react';
import { PerfectBarStyles } from './Tiles.styles';
import { PropTypes } from 'prop-types';

export const PerfectBar = ({ color }) => {
    return (
        <div className={PerfectBarStyles.perfectBarBox}>
            <div className={PerfectBarStyles.perfectBar(color)}>
                <div className={PerfectBarStyles.line(color)} />
                <span>– PERFECT –</span>
                <div className={PerfectBarStyles.line(color)} />
            </div>
        </div>
    );
};

PerfectBar.propTypes = {
    color: PropTypes.string.isRequired,
};
