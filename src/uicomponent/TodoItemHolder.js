import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import TodoItem from './TodoItem';



function TodoItemHolder(props) {
    const { project, addItem, checkItem, delItem, filterText ,filterDone} = props
    
    const projectName =  project.projectName 
    


    return (
        <Paper >
            <Typography variant="h5" component="h3" align="left" color='textPrimary' style={{ marginLeft: 10 }}>
                {projectName}
            </Typography >

            <Typography variant="body1" component="div" align="left" style={{ marginLeft: 10 }}>
                {projectName ? <TodoItem project={project} addItem={addItem} checkItem={checkItem} 
                    delItem={delItem} filterText={filterText} filterDone={filterDone}></TodoItem> : null}
            </Typography>


        </Paper>
    )
}

TodoItemHolder.propTypes = {
    project: PropTypes.object.isRequired
}

export default TodoItemHolder
