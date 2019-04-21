import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import CandidateItem from './CandidateItem';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
    root: {
      padding: theme.spacing.unit,
      [theme.breakpoints.down('xs')]: {
        backgroundColor: theme.palette.secondary.main,
        display: 'none'
      },
      [theme.breakpoints.up('md')]: {
        backgroundColor: theme.palette.primary.main,
      },
      [theme.breakpoints.up('lg')]: {
        backgroundColor: green[500],
      },
    },
  });
function TodoItem(props) {
    const { addItem, project, checkItem, delItem, filterText, filterDone, classes } = props
    const [isAddItem, setIsAddItem] = useState(false);
    // const [showDialog, setShowDialog] = useState(false);
    // const [anchorEl, setAnchorEl] = useState(null);
    const [editIndex, setEditIndex] = useState(-1);

    let candidate = (
        <TableRow>
            <TableCell colSpan={4}>
                <CandidateItem isFlex={true} isOpen={() => setIsAddItem(false)} addItem={addItem} selectedItem={project} />
            </TableCell>
        </TableRow>)
    let items = filterDone === 'all' ? project.todoItems :
        (filterDone === 'done' ? project.todoItems.filter((elm) => elm.isDone === true) : project.todoItems.filter((elm) => elm.isDone === false))

    return (
        <Table>
            <TableBody>
                <TableRow>{console.log('styles', styles)}
                    <TableCell colSpan={4}>
                        <Button color="secondary" style={{ marginLeft: 5 }} onClick={() => setIsAddItem(true)}>
                            Add Task
                        </Button>
                    </TableCell>
                </TableRow>
                {isAddItem ? candidate : null}
                {items
                    .filter((el) => el.label.indexOf(filterText) >= 0)
                    .map((elm, idx) => {
                        const row = idx === editIndex ?
                            (<TableRow key={`task_row_${idx}`}>
                                <TableCell colSpan={4}>
                                    <CandidateItem isFlex={true} isOpen={() => setEditIndex(-1)} addItem={addItem}
                                        selectedItem={project} taskIndex={idx} />
                                </TableCell>
                            </TableRow>)
                            : (<TableRow key={`task_row_${idx}`} hover={true} selected={elm.isDone}
                                onClick={(evt) => {
                                    setEditIndex(idx)
                                }}
                            >
                                <TableCell align="left" padding="checkbox" style={{ width: "10%" }}>
                                    <Checkbox
                                        name={`ck_${idx}`}
                                        checked={elm.isDone}
                                        onClick={(evt) => evt.stopPropagation()}
                                        onChange={(evt) => {
                                            checkItem(idx)
                                        }}
                                    />
                                </TableCell>
                                <TableCell component="td" scope="row" padding="none">
                                    {elm.label}
                                </TableCell>
                                <TableCell >
                                    {elm.detail}<ChatBubbleOutlineIcon onMouseOverCapture={(evt) => {
                                        console.log('over');
                                        evt.stopPropagation()
                                    }} />
                                </TableCell>
                                <TableCell>
                                    <Button color="secondary" style={{ marginLeft: 5 }}
                                        onClick={(evt) => {
                                            evt.stopPropagation()
                                            delItem(idx)
                                        }}>
                                        <DeleteForeverIcon />
                                    </Button>
                                    <div className={classes.root}>
      <div variant="subtitle1">{'down(sm): red'}</div>
      <div variant="subtitle1">{'up(md): blue'}</div>
      <div variant="subtitle1">{'up(lg): green'}</div>
    </div>
                                </TableCell>
                            </TableRow>)
                        return row;
                    })}
            </TableBody>
        </Table>

    );

}

TodoItem.propTypes = {
    project: PropTypes.object.isRequired,
}

export default withStyles(styles)(TodoItem)