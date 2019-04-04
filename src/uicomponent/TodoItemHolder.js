import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import SearchBar from './SearchBar'
import Button from '@material-ui/core/Button';

function TodoItemHolder(props) {
    const { projectName } = props.project
    return (
        <Paper >
            <Typography variant="h5" component="h3" align="left" color='textPrimary'>
                {projectName}
                {projectName?<Button color="primary" >
                    Add Task
                </Button>: null}
                
            </Typography>

        </Paper>
    )
}

TodoItemHolder.propTypes = {
    project: PropTypes.object.isRequired
}

export default TodoItemHolder
