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
import Popover from '@material-ui/core/Popover';

function TodoItem(props) {
    const { addItem, project, checkItem, delItem, filterText, filterDone } = props
    const [isAddItem, setIsAddItem] = useState(false);
    // const [showDialog, setShowDialog] = useState(false);
    // const [anchorEl, setAnchorEl] = useState(null);
    const [editIndex, setEditIndex] = useState(-1);

    let items = filterDone === 'all' ? project.todoItems :
        (filterDone === 'done' ? project.todoItems.filter((elm) => elm.isDone === true) : project.todoItems.filter((elm) => elm.isDone === false))


    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={4}>
                        <Button color="secondary" style={{ marginLeft: 5 }} onClick={() => setIsAddItem(true)}>
                            Add Task
                        </Button>
                    </TableCell>
                </TableRow>
                {isAddItem ? (
                    <TableRow>
                        <TableCell colSpan={4}>
                            <CandidateItem isFlex={true} isOpen={() => setIsAddItem(false)} addItem={addItem} selectedItem={project} />
                        </TableCell>
                    </TableRow>) : null}
                {items
                    .filter((el) => el.label.indexOf(filterText) >= 0)
                    .map((elm, idx) => {
                        const row = idx === editIndex ? 
                        (<TableRow>
                            <TableCell colSpan={4}>
                                <CandidateItem isFlex={true} isOpen={() => setIsAddItem(false)} addItem={addItem} selectedItem={project} />
                            </TableCell>
                        </TableRow>) 
                        : (<TableRow key={`task_row_${idx}`} hover={true} selected={elm.isDone}
                            onClick={(evt) => {
                                setEditIndex(idx)

                                console.log('row', evt.target)
                            }}
                        >
                            <TableCell align="left" padding="checkbox" style={{ width: "10%" }}>
                                <Checkbox
                                    name={`ck_${idx}`}
                                    checked={elm.isDone}
                                    onChange={(evt) => {
                                        //console.log('checkbox onChange', evt.target);
                                        checkItem(idx)
                                    }}
                                />
                            </TableCell>
                            <TableCell component="td" scope="row" padding="none">
                                {elm.label}
                                {/* <ChatBubbleOutlineIcon
                                name={`icon_${idx}`}
                                onClick={(evt) => {
                                    //this.setState({ [name]: value, event: evt })
                                    // setShowDialog(true)
                                    // setAnchorEl(evt.currentTarget)
                                }}
                            /> */}
                            </TableCell>
                            <TableCell>
                                {elm.detail}
                            </TableCell>
                            <TableCell>
                                <Button color="secondary" style={{ marginLeft: 5 }}
                                    onClick={(evt) => {
                                        evt.stopPropagation()
                                        delItem(idx)
                                    }}>
                                    <DeleteForeverIcon />
                                </Button>
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

export default TodoItem