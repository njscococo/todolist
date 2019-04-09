import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    flexDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        marginRight: '2px'
    },
    input: {
        display: 'none',
    },
};
function CandidateItem(props) {
    const { selectedItem, taskIndex } = props

    const [itemName, setItemName] = useState(taskIndex >= 0 ? selectedItem.todoItems[taskIndex].label : '')
    const [detail, setDetail] = useState(taskIndex >= 0 ? selectedItem.todoItems[taskIndex].detail : '')

    let addModeButton = (
        <Button variant="contained" color="primary" style={styles.button}
            onClick={() => {
                //selectedItem有值表示新增Task，沒有值表示新增Project
                if (selectedItem) {
                    //console.log('select', selectedItem)
                    props.addItem({
                        label: itemName,
                        detail: detail,
                        isDone: false
                    })
                } else {
                    props.addItem({
                        projectName: itemName,
                        todoItems: []
                    });
                }
                setItemName('');
                setDetail('');
                props.isOpen()
            }}
        >
            <AddCircleIcon style={{ marginRight: 5 }} />
            Add
        </Button>
    )

    let editModeButton = (
        <Button variant="contained" color="primary" style={styles.button}
            onClick={() => {
                props.addItem({
                    label: itemName,
                    detail: detail,
                    isDone: false
                },taskIndex)

                setItemName('');
                setDetail('');
                props.isOpen()
            }}
        >
            <AddCircleIcon style={{ marginRight: 5 }} />
            Edit
        </Button>
    )

    return (
        <div style={props.isFlex ? styles.flexDiv : null}>
            <div style={styles.flexDiv}>
                <TextField
                    id="candidateItem"
                    label={selectedItem ? "Task Name" : "Project Name"}
                    value={itemName}
                    onChange={(evt) => {
                        setItemName(evt.target.value);
                    }}
                    margin="normal"
                    variant="outlined"
                />
                {props.isFlex ?
                    <TextField
                        id="div_detail"
                        label="Detail"
                        value={detail}
                        onChange={(evt) => {
                            setDetail(evt.target.value);
                        }}
                        multiline={true}
                        margin="normal"
                        variant="outlined"
                    /> : null}

            </div>
            <div style={{ marginLeft: '2px' }}>
                {taskIndex >= 0 ? (editModeButton) : (addModeButton)}
                <Button variant="contained" color="secondary" style={styles.button}
                    onClick={() => {
                        props.isOpen();
                        console.log('cancel');
                    }}
                >
                    <DeleteIcon style={{ marginRight: 5 }} />
                    Cancel
                </Button>
            </div>
        </div>
    )
}

CandidateItem.propTypes = {
    isFlex: PropTypes.bool.isRequired,
    items: PropTypes.array,
    isOpen: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    taskIndex: PropTypes.number
}

CandidateItem.defaultProps = {
    isFlex: false,
    taskIndex: -1
}

export default CandidateItem;