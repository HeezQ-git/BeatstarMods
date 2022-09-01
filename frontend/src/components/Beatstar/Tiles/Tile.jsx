import React from 'react';
import { glassPieces, TilesStyles } from './Tiles.styles';
import { PropTypes } from 'prop-types';

export const Tile = ({ color, VFX }) => {
    return (
        <div className={TilesStyles.gradientBox}>
            <div className={TilesStyles.tile}>
                {VFX &&
                    Array(glassPieces.length)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className={TilesStyles.VFX(VFX, index)}
                            />
                        ))}
                <div className={TilesStyles.line(color)} />
            </div>
        </div>
    );
};

Tile.propTypes = {
    color: PropTypes.string.isRequired,
    VFX: PropTypes.string,
};
