import { MdOutlineDelete, MdDragIndicator, MdOutlineEdit, MdUndo } from 'react-icons/md';
import { createPortal } from 'react-dom';
import { EditDialog } from './StepTwoDialog';
import { useContext, useState } from 'react';
import { ConfigContext } from '../../ConfigCreator';
import { StepManagerStyles } from '../../ConfigCreator.styles';
import { Button, Grid, IconButton, Paper, Tooltip } from '@mui/material';
import { portal } from '../StepTwo';
import { PropTypes } from 'prop-types';
import { Slide, toast } from 'react-toastify';
import { ColorGradientContext } from './ColorGradient';

const UndoButton = ({ item, dispatch, configColorType, closeToast }) => {
    return (
        <div className={StepManagerStyles.undoButton}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div className={StepManagerStyles.showcaseColor(item.color, 20)} />
                Color removed
            </span>
            <div>
                <Button
                    color='primary'
                    size='small'
                    variant='contained'
                    startIcon={<MdUndo />}
                    onClick={() => {
                        dispatch({
                            type: 'UNDO_GRADIENT_COLOR',
                            payload: item.id,
                            configColorType,
                        });
                        closeToast();
                    }}
                >
                    UNDO
                </Button>
            </div>
        </div>
    );
};

export const GridItem = ({ item, provided, snapshot }) => {
    const { dispatch } = useContext(ConfigContext);
    const { configColorType, filteredGradient } = useContext(ColorGradientContext);

    const [dialogOpen, setDialogOpen] = useState(false);

    const usePortal = snapshot.isDragging;
    const length = filteredGradient.length;

    const child = (
        <Paper
            elevation={usePortal ? 16 : 8}
            className={StepManagerStyles.gridBox}
            sx={{
                height: {
                    xs: '80px',
                    lg: '55px',
                },
                width: {
                    xs: '90%',
                    lg: '100%',
                },
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
        >
            <Grid
                className={StepManagerStyles.gridItem}
                sx={{
                    display: 'flex',
                    flexDirection: {
                        xs: 'column',
                        lg: 'row',
                    },
                }}
            >
                <div className={StepManagerStyles.color}>
                    <div className={StepManagerStyles.showcaseColor(item.color)} />
                    <Tooltip title='Color'>
                        <div>{item.color}</div>
                    </Tooltip>
                    <Tooltip title='Stop'>
                        <div>{Math.round(item.time * 100, 2)}%</div>
                    </Tooltip>
                </div>
                <Grid
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: {
                            xs: '10px',
                            md: '0px',
                        },
                    }}
                >
                    <Tooltip title='Edit'>
                        <IconButton onClick={() => setDialogOpen(true)}>
                            <MdOutlineEdit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton
                            disabled={length <= 2}
                            onClick={() => {
                                dispatch({
                                    type: 'DELETE_GRADIENT_COLOR',
                                    payload: item.id,
                                    configColorType,
                                });
                                toast.info(
                                    <UndoButton
                                        dispatch={dispatch}
                                        item={item}
                                        configColorType={configColorType}
                                    />,
                                    {
                                        position: 'bottom-left',
                                        pauseOnHover: true,
                                        draggable: true,
                                        autoClose: 5000,
                                        transition: Slide,
                                        theme: 'light',
                                        closeOnClick: false,
                                    },
                                );
                            }}
                        >
                            <MdOutlineDelete />
                        </IconButton>
                    </Tooltip>
                    <div
                        style={{ display: 'flex' }}
                        {...provided.dragHandleProps}
                    >
                        <MdDragIndicator fontSize={20} />
                    </div>
                </Grid>
                <EditDialog
                    item={item}
                    open={dialogOpen}
                    setDialogOpen={setDialogOpen}
                />
            </Grid>
        </Paper>
    );

    if (!usePortal) {
        return child;
    }

    return createPortal(child, portal);
};

GridItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    provided: PropTypes.object.isRequired,
    snapshot: PropTypes.object.isRequired,
};

UndoButton.propTypes = {
    item: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    configColorType: PropTypes.string.isRequired,
    closeToast: PropTypes.func,
};
