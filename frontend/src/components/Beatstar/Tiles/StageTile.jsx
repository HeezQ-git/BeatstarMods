import React from 'react';
import { TilesStyles } from './Tiles.styles';
import { PropTypes } from 'prop-types';

export const StageTile = ({ color }) => {
    return (
        <div className={TilesStyles.gradientBox}>
            <div className={TilesStyles.stageTile(color)}>
                <span className={TilesStyles.circleTile} />
                <span className={TilesStyles.circleText}>BEATSTAR</span>
            </div>
        </div>
    );
};

StageTile.propTypes = {
    color: PropTypes.string.isRequired,
};
