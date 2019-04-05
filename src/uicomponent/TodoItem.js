import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CandidateItem from './CandidateItem';

function TodoItem(props) {
    const {addItem} = props
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('useEffect', props);
    })
    return (
        <Table>
            <TableBody>
                {}
                <TableRow>
                    <TableCell colSpan={2}>
                        <Button color="secondary" style={{ marginLeft: 5 }} onClick={() => addItem()}>
                            Add Task
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>
                        <CandidateItem />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" padding="checkbox" style={{ width: "10%" }}>
                        <Checkbox
                            checked={false}
                        //onChange={onSelectAllClick}
                        />
                    </TableCell>

                    <TableCell component="th" scope="row" padding="none">
                        {props.items.projectName}
                    </TableCell>

                </TableRow>
            </TableBody>
        </Table>
        // <List>
        //     <ListItem>
        //     <Checkbox
        //                     checked={false}
        //                 //   onChange={onSelectAllClick}
        //                 /> {props.items.projectName}
        //     </ListItem>

        // </List>
    );

}

TodoItem.propTypes = {
    items: PropTypes.object.isRequired
}

export default TodoItem