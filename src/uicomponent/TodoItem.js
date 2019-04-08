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

function TodoItem(props) {
    const { addItem, project, checkItem, delItem, filterText, filterDone } = props
    const [isAddItem, setIsAddItem] = useState(false);

    let items = filterDone === 'all' ? project.todoItems :
        (filterDone === 'done' ? project.todoItems.filter((elm) => elm.isDone === true) : project.todoItems.filter((elm) => elm.isDone === false))

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={3}>
                        <Button color="secondary" style={{ marginLeft: 5 }} onClick={() => setIsAddItem(true)}>
                            Add Task
                        </Button>
                    </TableCell>
                </TableRow>
                {isAddItem ? (
                    <TableRow>
                        <TableCell colSpan={3}>
                            <CandidateItem isFlex={true} isOpen={() => setIsAddItem(false)} addItem={addItem} selectedItem={project} />
                        </TableCell>
                    </TableRow>) : null}
                {items
                    //.filter((e) => e.isDone)
                    .filter((el) => el.label.indexOf(filterText) >= 0)
                    .map((elm, idx) => {
                        return (
                            <TableRow key={`task_row_${idx}`} hover={true} selected={elm.isDone}>
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
                                <TableCell component="th" scope="row" padding="none">
                                    {`${elm.label} : ${elm.detail}`}
                                </TableCell>
                                <TableCell>
                                    <Button color="secondary" style={{ marginLeft: 5 }} onClick={() => delItem(idx)}>
                                        <DeleteForeverIcon />
                                    </Button>
                                </TableCell>

                            </TableRow>)
                    })}
            </TableBody>
        </Table>

    );

}

TodoItem.propTypes = {
    project: PropTypes.object.isRequired,
}

export default TodoItem