import React, { createContext, useContext, useState } from 'react';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { MdOutlineAddCircleOutline, MdOutlineWarningAmber } from 'react-icons/md';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GridItem } from './GridItem';
import { StepManagerStyles } from '../../ConfigCreator.styles';
import { ConfigContext } from '../../ConfigCreator';
import { PropTypes } from 'prop-types';
import { isAscending } from '../../../../../utils/functions';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const ColorGradientContext = createContext();

export const ColorGradient = ({ configColorType, hidden }) => {
    const [id, setId] = useState(4);

    const { state, dispatch } = useContext(ConfigContext);

    const dragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(state[configColorType].gradient, result.source.index, result.destination.index);

        dispatch({
            type: 'SET_GRADIENT',
            payload: items,
            configColorType,
        });
    };

    const filteredGradient = state[configColorType].gradient.filter(
        (item) => !state[configColorType].toRemoved.includes(item.id),
    );

    const ascending = isAscending(filteredGradient.map((item) => item.time));

    return (
        <ColorGradientContext.Provider value={{ configColorType, filteredGradient }}>
            <div style={{ display: hidden ? 'none' : 'block' }}>
                <Grid
                    item
                    flexDirection='row'
                    justifyContent='space-evenly'
                    className={StepManagerStyles.root}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: {
                            xs: 'column',
                            md: 'row',
                        },
                    }}
                >
                    <div style={{ margin: '25px', width: '200px' }}>
                        <div
                            className={StepManagerStyles.gradientPreview(
                                filteredGradient,
                                200,
                                configColorType === 'ColorGradient' ? 'radial' : 'linear',
                            )}
                        />
                        <div className={StepManagerStyles.note}>* Note: in-game colors may differ from the preview</div>
                    </div>
                    <Grid
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: {
                                xs: 'column',
                                lg: 'row',
                            },
                            gap: '35px',
                            width: {
                                xs: '90%',
                                md: '80%',
                                lg: '60%',
                                xl: '50%',
                            },
                        }}
                    >
                        <DragDropContext onDragEnd={dragEnd}>
                            <Droppable
                                droppableId='droppable'
                                direction='vertical'
                            >
                                {(provided) => (
                                    <Grid
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={StepManagerStyles.grid}
                                        sx={{
                                            width: '100%',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        {filteredGradient.map((item, index) => (
                                            <Draggable
                                                key={`${item.id}`}
                                                draggableId={`${item.id}`}
                                                index={index}
                                            >
                                                {(draggableProvided, snapshot) => (
                                                    <GridItem
                                                        item={item}
                                                        key={index}
                                                        index={index}
                                                        provided={draggableProvided}
                                                        snapshot={snapshot}
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Grid>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <div className={StepManagerStyles.addColorIcon}>
                            <Tooltip
                                title='Add Color'
                                placement='top'
                            >
                                <IconButton
                                    disabled={filteredGradient.length >= 8}
                                    onClick={() => {
                                        const newColor = {
                                            color: '#212121',
                                            time: null,
                                            id,
                                        };
                                        dispatch({
                                            type: 'ADD_GRADIENT_COLOR',
                                            payload: newColor,
                                            configColorType,
                                        });
                                        setId((prevId) => prevId + 1);
                                    }}
                                >
                                    <MdOutlineAddCircleOutline />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Stops should be in ascending order'>
                                <IconButton
                                    disabled={ascending}
                                    color='warning'
                                    onClick={() =>
                                        dispatch({
                                            type: 'GRADIENT_SORT',
                                            configColorType,
                                        })
                                    }
                                >
                                    <MdOutlineWarningAmber />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </ColorGradientContext.Provider>
    );
};

ColorGradient.propTypes = {
    configColorType: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
};
